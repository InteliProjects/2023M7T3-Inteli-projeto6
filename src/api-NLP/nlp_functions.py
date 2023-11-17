import pandas as pd
import requests
import spacy
import re
import numpy as np
# vetorização
from scipy.spatial.distance import cosine
from gensim.models import KeyedVectors

import json

nlp = spacy.load("pt_core_news_lg")

cbow = "./data/cbow_s50.txt"
modelo_cbow = KeyedVectors.load_word2vec_format(cbow)

# Definição da função
def stop_words(valor):
    # print(dataframe.head(5))
    doc = nlp(valor)
    tokens_sem_stopwords = [token.text for token in doc if not token.is_stop]
    # Converter de volta para texto
    texto_sem_stopwords = ' '.join(tokens_sem_stopwords)
    return texto_sem_stopwords

# Definição da função
def lematizar(valor):
    # Processamento de lematização usando o SpaCy
    doc =  nlp(valor)
    # Extraia os lemas das palavras
    lemmas = [token.lemma_ for token in doc]
    # Converta os lemas em uma string
    lemmatized_text = " ".join(lemmas)
    return lemmatized_text

# Definição da função
def lower_text(valor):
    doc = nlp(valor)

    tokens = [token.text.lower() for token in doc]
    texto = ' '.join(tokens)
    return texto

# Definição da função
def remover_numeros(valor):
    # Uso da expressão regular para encontrar e substituir todos os números pelo caractere vazio ('')
    texto_sem_numeros = re.sub(r'["”“._%$\d]', '', valor)
    texto_sem_numeros = re.sub(r'[0-9\[\]]', '', texto_sem_numeros)
    # texto_sem_espacos_duplos = re.sub(r'\s+', '', texto_sem_numeros) #remover espaços duplos
    return texto_sem_numeros

# Definição da função
def tokenizar(valor):
    doc =  nlp(valor)
    tokens = [token for token in doc]
    return tokens

# Definição da função
def entidades(valor):
    # Processar o texto
    doc =  nlp(valor)
    # Iterar nas entidades previstas
    all_entidades = []
    for ent in doc.ents:
        # Imprimir o texto e a etiqueta da entidade
        # print(ent.text, ent.label_)
        all_entidades.append(ent.text)
    return all_entidades

# Definição da função
def vetorizar(valor):
    lixos = [] #palavras que serão desconsideradas
    # Processar o texto
    doc = nlp(valor)
    all_vectors = []
    for vec in doc:
        #filtra palavras que não existem / erros de digitação
        if vec.text in modelo_cbow:
            wordvec = modelo_cbow[vec.text]
            all_vectors.append(wordvec)
        else:
            lixos.append(vec.text)
    return all_vectors

# Definição da função
def vetorUnico(vetor_grande):
    soma = np.sum(vetor_grande, axis=0)
    return soma

# Definição da função
def similaridade(input,doc):
    result = 1 - cosine(input, doc)
    return result

def create_df():
    dataframe = pd.read_csv("./data/true.csv")
    print(dataframe.head(1))

    dataframe.drop("label", axis=1)
    print('drop')

    # Aplicar as funções a cada linha do df
    dataframe['text_tratado'] = dataframe['text'].apply(stop_words)
    print('stop')
    dataframe['text_tratado'] = dataframe['text_tratado'].apply(lematizar)
    print('lem')
    dataframe['text_tratado'] = dataframe['text_tratado'].apply(lower_text)
    print('lower')
    dataframe['text_tratado'] = dataframe['text_tratado'].apply(remover_numeros)
    print('rem')
    dataframe['text_tokens'] = dataframe['text_tratado'].apply(tokenizar)
    print('tok')
    dataframe['text_entidades'] = dataframe['text_tratado'].apply(entidades)
    print('ent')
    dataframe['vectors'] = dataframe['text_tratado'].apply(vetorizar)
    print('vec')
    dataframe['vectors'] = dataframe['vectors'].apply(vetorUnico)
    print("uniq")

    return dataframe


dataframe = create_df()
print(dataframe)

# Definição da função
def pipelineTratamento(texto):
    texto = stop_words(texto)
    texto = lematizar(texto)
    texto = lower_text(texto)
    texto = remover_numeros(texto)
    vetores = vetorizar(texto)
    vetor = vetorUnico(vetores)
    return vetor

# Definição da função
def pipeline(texto, userId, messageId):
    tratado = pipelineTratamento(texto)
    array=[]
    for item in dataframe['vectors']:
        sim = similaridade(tratado, item)
        array.append(sim)
    df = pd.DataFrame(array, columns=["vec"])
    k = 5
    maiores_valores = df["vec"].nlargest(k)
    indices_maiores = maiores_valores.index

    noticias = []
    titulos = []
    urls = []

    for i in indices_maiores:
        noticias.append(dataframe['text'][i])
        titulos.append(dataframe['title'][i])
        urls.append(dataframe['url'][i])

    noticias_dict = [
        {
        "title": titulos[0],
        "description": noticias[0],
        "url": urls[0],
        },
        {
        "title": titulos[1],
        "description": noticias[1],
        "url": urls[1],
        },
        {
        "title": titulos[2],
        "description": noticias[2],
        "url": urls[2],
        },
        {
        "title": titulos[3],
        "description": noticias[3],
        "url": urls[3],
        },
        {
        "title": titulos[4],
        "description": noticias[4],
        "url": urls[4],
        }
    ]

    json_data = json.dumps(noticias_dict)
    
    requests.post("http://localhost:8000/v1/communication/receiveNLP", {"data": json_data, "userId": userId, "messageId": messageId})

    return json_data