import unittest
from app import app
from flask import json

class FlaskTestCase(unittest.TestCase):

    def setUp(self):
        self.app = app.test_client()
        self.app.testing = True 

    def test_update_high_score(self):
        response = self.app.post('/update-high-score', 
                                 data=json.dumps({'highScore': 10}), 
                                 content_type='application/json')
        data = json.loads(response.get_data())
        self.assertEqual(response.status_code, 200)
        self.assertEqual(data['message'], 'High score updated successfully')

    def test_update_high_score_without_highscore(self):
        response = self.app.post('/update-high-score', 
                                 data=json.dumps({}), 
                                 content_type='application/json')
        data = json.loads(response.get_data())
        self.assertEqual(response.status_code, 400)
        self.assertEqual(data['message'], 'No high score provided')

if __name__ == "__main__":
    unittest.main()