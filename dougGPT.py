import openai_secret_manager
import open ai
from flask import Flask, request, jsonify

secrets = openai_secrets_manager.get_secret("chatgpt")
openai.api_key = secrets["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"]

app = Flask(_name_)

model = "text-davinci-002"
temperature = 0.5
max_tokens = 50

def chat():
  user_message = request.json['message']
  
  response = openai.Completion.create(
    engine = "text-davinci-003",
    prompt = user_message,
    tempature = 0.7,
    max_tokens = 3500
  )
    
response_text = response["choices"][0]["text"].strip()
return json(response_text)

if _name_ == '_main_':
  app.run(debug = True)
