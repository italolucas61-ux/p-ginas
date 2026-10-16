<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Entrega de páginas para prospecção

O usuário quer criar landing pages, visualizá-las facilmente e compartilhar prévias pela hospedagem Hostinger no domínio `altassite.com`. Priorize uma entrega independente em HTML, CSS e JavaScript, abrindo sem instalar ferramentas. Não introduza Vercel como requisito para esse fluxo.

Neste projeto, use `npm run export:hostinger` e `npm run verify:hostinger` para gerar e validar `entrega/teacher-murilo.zip`. O pacote contém um único `index.html`, com os recursos incorporados. O código em `src/` continua sendo a fonte do design e do conteúdo; a versão independente usa `scripts/standalone-runtime.js` para suas interações. Se alterar uma interação, mantenha a entrega independente equivalente e revalide.

Entregue um link de download real do GitHub para o pacote, após confirmar o envio. Caminhos internos de `/workspace` não são links públicos. Na Hostinger, use pastas de prévia separadas, como `public_html/previas/teacher-murilo/`, preservando o site principal. Não afirme que a página está publicada sem verificar a publicação. Instruções para o usuário estão em `entrega/LEIA-ME.md`.
