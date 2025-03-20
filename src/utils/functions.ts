
//fix url of book's cover. Sometimes it's from babelio, others it's from amazon (so I don't need to add https://www.babelio.com/ before)
//Since I add it automatically for now, I remove it
export const fixAmazonUrl = (url: string): string => {
    if (url.includes("amazon")) {
        return url.substring(23);
    }
    return url;
}