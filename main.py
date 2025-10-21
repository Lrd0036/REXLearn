import requests
import random

SUPABASE_URL = "https://qigdygawsjiwrotzuwpd.supabase.co/rest/v1"
API_KEY = "sb_publishable_5kS1DaZJTONgJlgmGpEJ3g_gWChFnQ-"
TABLE_NAME = "sherwin_products"

headers = {
    "apikey": API_KEY,
    "Authorization": f"Bearer {API_KEY}",
    "Content-Type": "application/json",
    "Accept": "application/json",
}

def fetch_all_products():
    response = requests.get(f"{SUPABASE_URL}/{TABLE_NAME}?select=*", headers=headers)
    response.raise_for_status()
    return response.json()

def create_hint(rex_number, attempt):
    length = len(rex_number)
    if attempt == 0:
        return "_" * length
    elif attempt == 1:
        # First 2 chars revealed, rest underscores
        return rex_number[:2] + "_" * (length - 2)
    elif attempt == 2:
        # First 2 and last 2 chars revealed, middle underscores
        if length <= 4:
            # If too short, reveal all
            return rex_number
        middle_underscores = "_" * (length - 4)
        return rex_number[:2] + middle_underscores + rex_number[-2:]
    else:
        return rex_number  # On last attempt or success, reveal full code

def quiz():
    products = fetch_all_products()
    if not products:
        print("No products found or API error.")
        return

    while True:
        product = random.choice(products)
        base_prompt = f"What is the REX number for {product['product']} {product['sheen']} {product['base']}?"

        tries = 3
        correct_rex = product['rex_number'].upper()

        for attempt in range(tries):
            hint = create_hint(correct_rex, attempt)
            print(f"{base_prompt} Hint: {hint}")
            user_answer = input(f"Your answer (or 'quit' to exit), attempt {attempt + 1} of {tries}: ").strip().upper()
            if user_answer == 'QUIT':
                print("Goodbye!")
                return

            if user_answer == correct_rex:
                print("Correct!")
                break
            else:
                print("False.")

        else:  # If all attempts used without break
            print(f"Out of attempts! The correct REX number was: {correct_rex}")

        print("-" * 40)

if __name__ == "__main__":
    quiz()
