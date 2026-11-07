# Akira Kobayashi — landing page

Código da versão publicada em https://akira-kobayashi.vercel.app, atualizada em 06/11/2026.

React 19, TypeScript, Vite e CSS nativo. Layout responsivo, quatro fotografias reais, navegação compacta ao rolar, áreas de atuação em painéis, método em capítulos, fotos com animações reversíveis, assinatura interativa e FAQ acessível. Respeita a preferência de movimento reduzido.

## Executar

```sh
npm ci
npm run dev
```

## Validar e gerar produção

```sh
npm run lint
npm run typecheck
node scripts/test-family-whatsapp.mjs
npm run build
npm run preview -- --port 4175
```

O build gera `dist/`, com a landing e `/privacidade.html` pré-renderizadas. Pode ser publicado em hospedagem estática. `vercel.json` configura o build para Vercel; este upload não cria conexão automática com a hospedagem existente.

## Manutenção

- `src/config/site.ts`: conteúdo e contatos.
- `src/lib/family-whatsapp.ts`: mensagem dinâmica para as 16 combinações do checklist; o visitante revisa e envia no WhatsApp.
- `src/components/HeaderHero.tsx`: navegação e progresso de leitura.
- `src/components/PracticeExplorer.tsx`: áreas de atuação.
- `src/components/MethodJourney.tsx`: etapas sincronizadas com a rolagem.
- `src/components/BrandSignature.tsx`: assinatura da marca.
- `src/components/Sections.tsx`: demais seções.
- `src/styles/`: identidade, responsividade e animações.
- `public/photos/`, `public/brand/`, `public/images/`: fotos, marca e fontes locais.
- `scripts/prerender.mjs`: HTML estático, metadados, sitemap e robots.

As capturas históricas, configurações locais da Vercel e dependências instaladas não são versionadas. O teste unitário incluído verifica as 16 combinações de mensagem do WhatsApp.

A versão publicada passou em lint, TypeScript, build, 16 testes unitários do WhatsApp e verificações de produção em desktop e celular. Não há backend, formulários, analytics ou envio automático de mensagens.

