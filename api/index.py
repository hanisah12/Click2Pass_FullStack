import sys
import os

# Add the Backend directory to the path so imports work correctly
current_dir = os.path.dirname(os.path.abspath(__file__))
parent_dir = os.path.dirname(current_dir)
sys.path.append(os.path.join(parent_dir, 'Backend'))

# Import the app from your Backend/main.py
from Backend.main import app
