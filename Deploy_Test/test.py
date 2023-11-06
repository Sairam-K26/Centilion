import requests
import json

url = "http://localhost:5000/api/chat"
data = {"user_input": "when is diwali celebrated"}

response = requests.post(url, data=json.dumps(data), headers={"Content-Type": "application/json"})
print(response.json())
