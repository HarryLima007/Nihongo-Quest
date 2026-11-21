import re, pathlib, json
src = pathlib.Path('src')
css = (src/'style.css').read_text()
css = '[hidden]{display:none!important}\n' + css
man = json.loads((src/'manifest.json').read_text())
js = '\n'.join((src/f).read_text() for f in man['content'] + man['app'])
shell = (src/'shell.html').read_text()
# inline tab icons from IC object in app.js
for name in ['home','academy','chat','world','review','book','user']:
    m = re.search(name + r": '(<svg.*?</svg>)'", js)
    shell = shell.replace('<!--IC_%s-->' % name, m.group(1))
head = '''<title>Nihongo Quest</title>
<meta name="claude:viewport-fit-sides" content="cover">
<meta name="description" content="Academia gamificada de japonês para brasileiros">
<meta name="theme-color" content="#191c4a">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=M+PLUS+Rounded+1c:wght@500;700;800&family=Nunito:wght@500;600;700;800&display=swap">
'''
body = '<style>\n' + css + '\n</style>\n' + shell + '<script>\n' + js + '\n</script>\n'
pathlib.Path('dist').mkdir(exist_ok=True)
pathlib.Path('dist/app.html').write_text(head + body)
standalone = '<!doctype html>\n<html lang="pt-BR">\n<head>\n<meta charset="utf-8">\n<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover, interactive-widget=resizes-content">\n' + head + '<style>:root{padding-top:env(safe-area-inset-top,0px);padding-bottom:env(safe-area-inset-bottom,0px)}body{margin:0}img{max-width:100%}</style>\n</head>\n<body>\n' + body + '</body>\n</html>\n'
pathlib.Path('dist/nihongo-quest.html').write_text(standalone)
print(len(standalone))
