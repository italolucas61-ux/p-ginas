# Abrir e compartilhar a página

## Ver no computador

1. Baixe `teacher-murilo.zip`.
2. Extraia o ZIP.
3. Abra `index.html` com dois cliques no Chrome, Edge ou Firefox atualizado.

O arquivo contém a página inteira, incluindo estilos, ícones, fontes e interações. Não precisa instalar programas nem executar comandos. Links para páginas externas exigem internet.

## Colocar na Hostinger

1. No hPanel da Hostinger, abra o gerenciamento do site `altassite.com`.
2. Entre em **Arquivos → Gerenciador de Arquivos** e abra `public_html` do domínio.
3. Crie as pastas `previas` e, dentro dela, `teacher-murilo`.
4. Envie `teacher-murilo.zip` para `public_html/previas/teacher-murilo/`.
5. Use **Extrair** nessa pasta. O arquivo final deve ficar diretamente em `public_html/previas/teacher-murilo/index.html`.
6. Depois do upload, abra **https://altassite.com/previas/teacher-murilo/** e compartilhe esse endereço.

Esse endereço só fica disponível após o upload na sua hospedagem. O pacote foi preparado e testado; não houve acesso nem alteração na sua conta da Hostinger. Se esse domínio estiver associado a outro diretório no painel, use a pasta raiz indicada para ele. Não substitua o `index.html` da raiz do seu site principal.

## Repetir para outros prospectos

Use uma pasta para cada página: `public_html/previas/nome-do-prospecto/index.html`. O link terá o mesmo caminho, por exemplo `https://altassite.com/previas/nome-do-prospecto/`.

Ao pedir uma nova página ao Codex, peça uma **entrega estática em HTML, CSS e JavaScript, com ZIP para Hostinger e visualização local por dois cliques**. Primeiro aprove a página no computador; depois envie os arquivos à hospedagem.

## Atualizar esta entrega

Para quem estiver desenvolvendo no Codex: edite a página em `src/`, execute `npm run export:hostinger` e `npm run verify:hostinger`. O exportador reaproveita o conteúdo e o design renderizados, incorpora os recursos e gera o ZIP. O script `scripts/standalone-runtime.js` mantém as interações da versão HTML. As verificações exercitam o documento independente sem recursos de rede e a hospedagem em uma subpasta. O navegador gerenciado deste ambiente bloqueia a navegação `file://` por política administrativa; a abertura por dois cliques não pôde ser executada aqui e o mesmo HTML foi carregado em memória para os testes independentes.

Esta é uma prévia comercial do redesign. Checkout, fotografias originais, depoimentos e condições comerciais continuam pendentes conforme a página. A entrega mantém o aviso de checkout e a orientação de não indexação; o link é público para quem o receber, sem senha.
