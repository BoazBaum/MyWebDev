

import os
from typing import Tuple
import openai
from groq import Groq
from dotenv import load_dotenv

load_dotenv()


class LlmFactory:
    _instance = None

    @classmethod
    def instance(cls):
        if not cls._instance:
            cls._instance = cls()
        return cls._instance
    
    def get_llm(self, llm_logical_name:str) -> Tuple [openai.OpenAI, str, int]:
        if (llm_logical_name == "openai4o"):
            if(not hasattr(self, '_openai4o') or self._openai4o is None):
                self._openai4o = openai.OpenAI(api_key=os.getenv("OPENAI_API_KEY"))
            return self._openai4o, "gpt-4o", 128*1024
        
        if (llm_logical_name == "openai4t"):
            if(not hasattr(self, '_openai4t') or self._openai4t is None):
                self._openai4t = openai.OpenAI(api_key=os.getenv("OPENAI_API_KEY"))
            return self._openai4t, "gpt-4-turbo", 128*1024
        
        if (llm_logical_name == "groq_llama3_70b"):
            if(not hasattr(self, '_groq_llama3_70b') or self._groq_llama3_70b is None):
                self._groq_llama3_70b = Groq(api_key=os.getenv("GROQ_API_KEY"))
            return self._groq_llama3_70b,"Llama3-70b-8192", 8192
        
        if (llm_logical_name == "groq_mixtral"):
            if(not hasattr(self, '_groq_mixtral') or self._groq_mixtral is None):
                self._groq_mixtral = Groq(api_key=os.getenv("GROQ_API_KEY"))
            return self._groq_mixtral,"mixtral-8x7b-32768", 32*1024

        if (llm_logical_name == "groq_llama8b"):
            if(not hasattr(self, '_groq_llama8b') or self._groq_llama8b is None):
                self._groq_llama3_70b = Groq(api_key=os.getenv("GROQ_API_KEY"))
            return self._groq_llama8b,"Llama3-8b-8192", 8192
        
        if (llm_logical_name == "local_llama3"):
            if(not hasattr(self, '_local_llama3') or self._local_llama3 is None):
                self._local_llama3 = openai.OpenAI(base_url=os.getenv('LOCAL_BASE_URL', "http://localhost:11434/v1"), api_key="non")
            return self._local_llama3,"llama3", 8*1024
        

        if(not hasattr(self, '_local_mistral') or self._local_mistral is None):
            self._local_mistral = openai.OpenAI(base_url=os.getenv('LOCAL_BASE_URL', "http://localhost:11434/v1"), api_key="non")
        return self._local_mistral,"mistral", 128*1024