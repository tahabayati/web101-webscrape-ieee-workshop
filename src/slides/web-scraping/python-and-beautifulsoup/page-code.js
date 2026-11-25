// Every scraping step starts with the same two lines.
export const parsePage = `from bs4 import BeautifulSoup

soup = BeautifulSoup(html, "html.parser")`

export const printBooks = `for card in soup.select(".product_pod"):
    title = card.select_one("h3 a")["title"]
    price = card.select_one(".price_color").get_text()`
