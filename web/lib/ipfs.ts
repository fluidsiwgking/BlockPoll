export function toIpfsUri(cid: string) { return `ipfs://${cid}`; }
export function fromIpfsUri(uri: string) { return uri.replace(/^ipfs:\/\//, ""); }
