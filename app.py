import json
from flask import Flask, jsonify, request
from diffusion import generate_image

app = Flask(__name__)
@app.route("/")
def hello():
    return "Hello, World!"

@app.route('/generate', methods=['POST'])
def generate():
    if request.method == 'POST':
        data = request.json
        generate_image(
            prompt=data['prompt'],
            negative_prompt=data['negPrompt'],
            height=data['height'],
            width=data['width'],
            num_inference_steps=data['value'],
            num_images_per_prompt=data['num'],
        )
        return jsonify({'class_id': 1, 'class_name': 'hao123'})

if __name__ == '__main__':
    app.run()
