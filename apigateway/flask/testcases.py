import requests


def test_getAllInfo():
    url = "localhost:5000/getAllInfo"

    payload={}
    headers = {}

    response = requests.request("GET", url, headers=headers, data=payload)

    print(response.text)

def main():
    test_getAllInfo()

if __name__ == "__main__":
    main()