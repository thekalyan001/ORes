import tensorflow as tf
import base64
from PIL import Image
from io import BytesIO
from tensorflow.keras.preprocessing.image import img_to_array
import numpy as np
from tensorflow.keras.preprocessing.image import img_to_array
from tensorflow.keras.applications.inception_v3 import preprocess_input
from tensorflow.keras.applications.inception_v3 import decode_predictions
import pickle
import os,shutil
import base64

import json
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


model = tf.keras.models.load_model('inception_transfer.h5')
# model=InceptionV3()
classes = {
	"phone" : ['Cellphone','Smartphone', 'Touchscreen','dial_telephone','iPod','cellular_telephone','hand-held_computer'],
	"laptop" : ['desktop_computer','Laptop computer','Tablet computer', 'notebook', 'laptop'],
	'microphone' : ['Headset', 'Microphone'],
	'camera' : ['reflex_camera'],
	'fashion': ["swimming_trunks",'jean','jersey','mailbag','sunglass','sunglasses','fur_coat',"cowboy_boot","cowboy_hat","purse","Bathrobe", "pajama","Cowboy hat","Fur coat","suit","Kimono","analog_clock","sandal","Miniskirt","Running shoe","sweatshirt","Trench coat","Wetsuit","Ankle boot","Ballet shoe","Cowboy boot","Flip-flop","Loafer","Moccasin","running_shoe","Sandal","Slipper","Sneaker",]
	,
	'electronics': ['vending_machine','loudspeaker','space_heater','refrigerator','CD_player','cassette_player','cash_machine','television','remote_control','radio','web_site','radio_telescope','modem','waffle_iron',"printer",'home_theater',"projector","electric_guitar","electric_locomotive"]
}



# Save the dictionary as a pickle file
# with open('classes.pickle', 'wb') as fp:
#     pickle.dump(classes, fp)



# # Load the dictionary from the pickle file
# with open('classes.pickle', 'rb') as fp:
#     classes = pickle.load(fp)



def predict_output(image, category)->bool:
	img_array = img_to_array(image)
	img_array = np.expand_dims(img_array, axis=0)
	img_array = preprocess_input(img_array)
	output = model.predict(img_array)
	class_name = decode_predictions(output, top=1)[0]
	print(class_name[0][1])
	for key in classes.keys():
		for val in classes[key]:
			if val == class_name[0][1]:
				print(f"val {val} key {key}")
				return key == category.lower()

	return False




@app.route("/check",methods=["POST"])
def func():
	img = request.files['image']
	category = request.form['category']
	print(type(img), category)
	image_bytes = img.read()
	image = Image.open(BytesIO(image_bytes))
	image = image.resize((299,299),  Image.NEAREST)
	# image.show()
	success = False
	if predict_output(image, category):
		success = True
	response_data = {'success': success}
	return jsonify(response_data)


if __name__ == '__main__':
    app.run(debug=True)


