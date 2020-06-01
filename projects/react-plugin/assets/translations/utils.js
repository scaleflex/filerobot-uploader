export const getContentWithNumber = (content, amount) => !amount ?
  `${content.replace('{number}', '')}`
:
  `${content.replace('{number}', amount)}${amount !== 1 ? 's' : ''}`
;