import torch
from transformers import GPT2LMHeadModel, GPT2Tokenizer
from flask import Flask, request, jsonify

app = Flask(__name__)

# Load pre-trained GPT-2 model and tokenizer
model_name = "gpt2-medium"
tokenizer = GPT2Tokenizer.from_pretrained(model_name)
model = GPT2LMHeadModel.from_pretrained(model_name)

@app.route('/')
def index():
    return "Welcome to the Diet Suggestion Chatbot!"

@app.route('/api/chat', methods=['POST'])
def chat():
    data = request.get_json()
    user_input = data['user_input']
    input_ids = tokenizer.encode(user_input, return_tensors='pt')

    # Generate a response from the model
    with torch.no_grad():
        output = model.generate(input_ids, max_length=150, num_return_sequences=1)
    
    response = tokenizer.decode(output[0], skip_special_tokens=True)
    return jsonify({'response': response})

if __name__ == '__main__':
    app.run(debug=True, port=5000)
