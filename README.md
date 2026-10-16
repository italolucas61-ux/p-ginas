# Jornada do Zero à Fluência — Teacher Murilo

Redesign completo da landing page em Next.js App Router, React, TypeScript, Tailwind CSS e Lucide. Identidade azul-marinho e dourado, fontes Manrope e Inter hospedadas localmente, componentes reutilizáveis e conteúdo centralizado.

## Visualizar e compartilhar pela Hostinger

A entrega para uso direto está em **`entrega/teacher-murilo.zip`**. Extraia e abra `index.html` com dois cliques para visualizar a página no computador. O arquivo inclui estilos, fontes, ícones e interações; não precisa de Node.js, Vercel ou um servidor local para abrir essa versão.

Para compartilhar com prospectos, envie esse `index.html` para `public_html/previas/teacher-murilo/` na hospedagem de `altassite.com`. Após o upload, o endereço será `https://altassite.com/previas/teacher-murilo/`. As instruções completas estão em [entrega/LEIA-ME.md](entrega/LEIA-ME.md). A publicação na Hostinger é uma etapa externa; gerar o pacote não a realiza.

Para regenerar a entrega após editar a página:

```bash
npm run export:hostinger
npm run verify:hostinger
```

O exportador usa o build de produção como fonte do HTML, reutiliza todos os 21 módulos e incorpora os recursos. A versão independente usa `scripts/standalone-runtime.js` para menu, filtros, expansão e diálogos. As verificações testam o mesmo documento carregado em memória, sem recursos de rede, e a hospedagem em uma subpasta, incluindo os sete tamanhos de tela e as interações. A abertura via `file://` foi bloqueada pela política administrativa do navegador do ambiente e não é apresentada como executada. As capturas estão em `entrega/preview-desktop.png` e `entrega/preview-mobile.png`.

## Executar

Requer Node.js 24 (versão usada: 24.19.0) e npm. Use o checkout existente; cada tarefa na nuvem já é isolada e não requer um Git worktree.

```bash
cd /workspace/p-ginas
npm ci
npm run dev
```

Para produção:

```bash
npm run build
npm run start
```

Nenhum banco, serviço externo ou credencial é necessário para executar o redesign. A instalação usa `registry.npmjs.org`. Todas as fontes e artes desta versão são locais.

## Publicar na Vercel

O arquivo `vercel.json` declara o framework Next.js, a instalação com `npm ci`, o build com `npm run build` e o diretório de saída `.next`.

Importe o repositório `italolucas61-ux/p-ginas`, use a branch `main` e mantenha o diretório raiz como `./`. Nas configurações de build, selecione **Next.js**. Caso exista uma substituição manual de **Output Directory** com o valor `public`, remova essa substituição ou configure `.next`.

O diretório `public` é destinado a arquivos estáticos opcionais; a saída deste build é `.next`. A mensagem “No Output Directory named public found” indica uma configuração de saída incompatível na hospedagem.

Após corrigir as configurações, faça o deploy do commit mais recente da `main`, que contém `vercel.json`. Reimplantar um commit anterior mantém a configuração antiga. Um build local aprovado confirma a geração dos arquivos, mas não confirma a publicação na conta da Vercel.

## Validação

```bash
npm run lint
npm run typecheck
npm run format:check
npm run test:e2e
```

Os testes de navegador usam Chromium e Playwright. Neste ambiente, `/usr/bin/chromium` é detectado automaticamente. Em outra máquina, execute `npx playwright install chromium` uma vez. `test:e2e` faz o build e inicia um servidor de produção próprio na porta 3100. Essa porta deve estar livre; a suíte não reutiliza servidores antigos.

A suíte cobre os sete breakpoints solicitados (320, 375, 430, 768, 1024, 1440 e 1920px), overflow e cortes de texto, catálogo expandido, filtros, navegação, menu mobile e Escape, detalhes dos módulos, FAQ, aviso de checkout, restauração de foco, metadados, fontes locais, âncoras e auditoria automatizada WCAG A/AA em desktop e mobile. A auditoria automatizada complementa a inspeção visual e não representa uma certificação integral de acessibilidade.

## Estrutura

- `src/app/`: página, estilos, layout, favicon e imagem Open Graph.
- `src/components/landing-page.tsx`: header, hero, identificação, método, currículo, acompanhamento, benefícios, depoimentos, oferta, FAQ, CTA e footer.
- `src/lib/content.ts`: oferta, navegação, 21 conteúdos da referência, benefícios, depoimentos e FAQ.
- `tests/landing.spec.ts`: validação funcional, responsiva e de acessibilidade.

## Decisões do redesign

- Hierarquia clara da oferta e do acompanhamento; azul-marinho `#0B2140`, azul `#1E3A8A` e dourado `#F4C430`.
- Logo tipográfica provisória que preserva nome, hierarquia e essência dourada; nenhum símbolo inventado como marca oficial.
- Catálogo com filtros, oito conteúdos inicialmente visíveis e expansão acessível para os 21 conteúdos identificados.
- Capas tipográficas próprias e composição editorial da Jornada enquanto faltam arquivos originais de alta resolução. Essas artes não são capturas da plataforma e não representam uma fotografia do professor.
- Sem preços anteriores, depoimentos, contadores, números de alunos ou garantias inventados. Os nomes “Inglês em 10 dias” e “Acompanhamento Vitalício Comigo” foram preservados como títulos dos conteúdos, sem transformá-los em promessas contratuais.
- Diálogos nativos, retorno de foco, FAQ com HTML semântico, foco visível e respeito a movimento reduzido.
- Sem dependência de fontes remotas, imagens de banco ou imagens fictícias do professor.

## Personalizar e preparar a publicação

Os materiais recebidos foram o prompt completo e a imagem vertical da página antiga. A segunda referência visual mencionada no prompt não foi recebida.

Página oficial informada pelo usuário: https://www.teachermurilo.com/zerofluency. A consulta no ambiente foi bloqueada pelo proxy de rede com `403` no túnel CONNECT; não foi possível extrair com segurança os arquivos ou o checkout. Os domínios `www.teachermurilo.com` e `teachermurilo.com` foram adicionados ao rascunho das configurações do ambiente. Salvar o rascunho não aplica essa alteração ao ambiente atual; após a liberação, a página precisa ser consultada novamente. Dependendo do servidor de mídia utilizado pela página oficial, outros domínios específicos podem ser necessários.

Antes da publicação comercial, revisar:

- [ ] Colocar os arquivos autorizados em `public/` e preencher `siteConfig.teacherImage` com um caminho local, como `/teacher-murilo.webp`. Isso substitui automaticamente as artes editoriais nas seções de destaque e acompanhamento.
- [ ] Adicionar `image` aos módulos para substituir as capas tipográficas por capas oficiais. Preferir WebP/AVIF e manter proporção consistente.
- [ ] Preencher `testimonials` somente com depoimentos fiéis e autorizados. O estado vazio atual informa que o conteúdo está pendente.
- [ ] Confirmar o valor de referência de **R$ 297,00** e alterar `priceConfirmed` somente após confirmação. Não preencher `previousPrice` sem uma comparação comercial verdadeira.
- [ ] Preencher `checkoutUrl` com o link HTTPS oficial. Até lá, o botão de compra abre um aviso claro e oferece a página oficial; não processa pagamentos.
- [ ] Confirmar prazo de acesso, garantia, formas de pagamento e formato/frequência/condições do acompanhamento, atualizando os campos e o FAQ em `src/lib/content.ts`.
- [ ] Validar benefícios, suporte, requisitos da plataforma e condições do certificado com o responsável pela oferta.
- [ ] Preencher `siteUrl` para canonical e URLs absolutas Open Graph. O projeto inclui imagem social gerada localmente.
- [ ] Adicionar `privacyUrl`, `termsUrl` e `contactUrl` oficiais. Links ausentes não são exibidos.
- [ ] Reexecutar os testes e revisar fotos, direitos de uso e textos finais.

A página mantém `noindex` enquanto `checkoutUrl` ou a confirmação de preço estão ausentes, para evitar a indexação involuntária da versão provisória. Confirme todos os itens acima antes de habilitar a oferta e a indexação. Os arquivos estão preparados para build de produção, mas a compra e os conteúdos autênticos pendentes impedem considerar a oferta pronta para venda.

Não há deploy automático, alterações na página oficial, checkout fictício nem envio de dados para serviços externos.
