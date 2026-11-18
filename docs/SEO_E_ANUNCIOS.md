# SEO e anúncios (Google Ads)

## O que o site já faz

- O HTML vem pré-renderizado: o Google lê o conteúdo sem precisar rodar JavaScript.
- Título e descrição focam em "advogado criminalista" e "execução penal".
- Os dados estruturados (schema.org) descrevem o escritório (LegalService/Attorney), o advogado com a OAB, os 14 serviços e as 6 perguntas frequentes (FAQPage).
- Arquivos robots.txt e sitemap.xml com data de atualização.
- A imagem principal é carregada antes, o que melhora o tempo de carregamento no celular.
- Lighthouse: no celular, desempenho 97, acessibilidade 97, boas práticas 100 e SEO 100. No computador, desempenho 100.
- Medição do Google Ads e do GA4 só depois do aceite no aviso de cookies (LGPD). Sem os IDs, nada é carregado e o aviso não aparece.
- A conversão é contada no clique para o WhatsApp ou para o telefone.

## Variáveis de ambiente (Vercel → Settings → Environment Variables)

| Variável | Para quê |
|---|---|
| `SITE_URL` | Domínio final, por exemplo `https://www.dominio.com.br`. Ajusta o canonical, o sitemap e os dados estruturados. |
| `SITE_CITY` | Cidade do escritório, só quando o endereço estiver confirmado para publicação. |
| `SITE_AREAS` | Cidades atendidas, separadas por vírgula (por exemplo `Bauru,São Paulo`). |
| `GOOGLE_SITE_VERIFICATION` | Código da meta tag do Search Console. |
| `VITE_GOOGLE_ADS_ID` | ID da conta do Ads (`AW-...`). |
| `VITE_GOOGLE_ADS_CONVERSION_LABEL` | Rótulo da conversão "Clique no WhatsApp". |
| `VITE_GA4_ID` | ID do GA4 (`G-...`), se for usado. |

Depois de mudar qualquer uma delas, é preciso fazer um novo deploy.

## Fora do código (o que decide a posição)

- **Anúncio pago:** a posição depende do lance e do Índice de Qualidade. O Índice de Qualidade considera a relevância do anúncio para a busca, a taxa de cliques esperada e a experiência na página.
- **Orgânico:** leva semanas ou meses. Ajudam o domínio próprio, o Search Console com o sitemap enviado, o Perfil da Empresa no Google e menções e links de sites confiáveis (OAB, imprensa, Instagram).
- **Perfil da Empresa no Google:** para buscas como "advogado criminalista perto de mim", é o que mais pesa. Precisa do endereço real ou da área de atendimento.
- **Regras da OAB (Provimento 205/2021):**
  - Use só a busca do Google (publicidade passiva).
  - Os anúncios devem ser informativos e sóbrios.
  - Não prometa resultado e não fale de preço, gratuidade ou "primeira consulta grátis".
  - Não use linguagem de captação ("ligue já", "garantimos").
  - Não compare com outros escritórios.
  - Nunca use o nome de outros advogados como palavra-chave.
