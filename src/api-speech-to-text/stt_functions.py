
import json
def generateConfidence(confidences):
    result = 0
    for confidence in confidences:
        result += confidence
    
    result = result/len(confidences)
    return result
  
def formatTranscription(transcription):
    transcription = json.dumps(transcription, indent=2, ensure_ascii=False)
            
    transcriptionText = ""
    transcriptionValue = []

    for results in json.loads(transcription)["results"]:
        for alternatives in results["alternatives"]:
            transcriptionText += alternatives["transcript"]
            transcriptionValue.append(alternatives["confidence"])
    
    transcriptionFormated = {
        "transcript": transcriptionText,
        "confidence": generateConfidence(transcriptionValue)
    }
    return transcriptionFormated