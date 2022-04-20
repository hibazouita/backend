import fitz
import sys

doc=fitz.open(sys.argv[1])
doc2=fitz.open(sys.argv[2])
text = "akwel"
    
# iterating through pages for highlighting the input phrase
for page in doc:
    match_words = page.searchFor(text)
    
    for word in match_words:
        highlight = page.addHighlightAnnot(word)
        highlight.update()
for page in doc2:
    match_words = page.searchFor(text)
    
    for word in match_words:
        highlight = page.addHighlightAnnot(word)
        highlight.update()    
# saving the pdf file as highlighted.pdf
doc.save("C:/files/highlighted.pdf")
doc.save("C:/files/highlighted22.pdf")

print("C:/files/highlighted.pdf")
print("C:/files/highlighted22.pdf")