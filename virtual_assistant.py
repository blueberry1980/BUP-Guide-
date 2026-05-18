import os
import re

# ====================================================================
# VIRTUAL ASSISTANT NLP MODULE (PYTHON IMPLEMENTATION)
# ====================================================================

# 1. Tokenization Implementation
def tokenize_text(text):
    """
    NLP Implementation: Tokenization
    Breaks a given string into smaller units (tokens), useful for analysis.
    """
    # Simple regex-based word tokenization
    tokens = re.findall(r'\b\w+\b', text.lower())
    return tokens

# 2. Sentiment Analysis Implementation
def analyze_sentiment(text):
    """
    NLP Implementation: Sentiment Analysis
    Detects if the user's input is Positive, Negative, or Neutral.
    """
    positive_words = {"good", "great", "excellent", "thanks", "helpful", "love"}
    negative_words = {"bad", "poor", "terrible", "hate", "issue", "problem"}
    
    tokens = tokenize_text(text)
    
    pos_count = sum(1 for t in tokens if t in positive_words)
    neg_count = sum(1 for t in tokens if t in negative_words)
    
    if pos_count > neg_count:
        return "Positive"
    elif neg_count > pos_count:
        return "Negative"
    return "Neutral"

# 3. Text Classification (Spam / Not Spam) Implementation
def is_spam(text):
    """
    NLP Implementation: Text Classification (Spam Detection)
    Classifies if the user is sending spam based on keywords or length patterns.
    """
    spam_keywords = {"buy", "cheap", "click", "subscribe", "winner", "cash", "prize"}
    tokens = tokenize_text(text)
    
    spam_count = sum(1 for t in tokens if t in spam_keywords)
    
    if spam_count >= 2 or len(tokens) > 100:  # arbitrary threshold for demo
        return True
    return False

# 4. Voice-to-Text (Speech Recognition) Implementation
def speech_recognition_placeholder():
    """
    NLP Implementation: Voice-to-Text (Speech Recognition)
    (Requires SpeechRecognition or whisper library in a real Python environment)
    """
    print("Listening for user audio...")
    # audio = microphone.listen()
    # text = recognizer.recognize_google(audio)
    return "This is a transcribed voice input."

# 5. Chatbot System (using Google Gemini API)
def generate_bot_response(user_text):
    """
    Chatbot System Core Implementation
    Takes sanitized, non-spam text and generates a conversational reply using AI.
    """
    if is_spam(user_text):
         return "Warning: Spam detected. Request blocked."
         
    # Example logic integrating with Gemini config
    print(f"Tokenized Input: {tokenize_text(user_text)}")
    print(f"Sentiment Detected: {analyze_sentiment(user_text)}")
    print("Generating response via Gemini...")
    
    # Normally this would be model.generate_content(...)
    return "Hello! How can I help you navigate the campus today?"

if __name__ == "__main__":
    # Test our Python Virtual Assistant
    test_input = "Hello! Where is the CS 119 class located? I am lost."
    print("User says:", test_input)
    print("--- NLP processing ---")
    response = generate_bot_response(test_input)
    print("Bot replies:", response)
