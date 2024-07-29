export const fetchProxyCheck = async (proxy: string): Promise<boolean> => {
  try {
    return new Promise((resolve, _) => {
      setTimeout(() => {
        console.log(proxy)
        resolve(Math.random() > 0.5)
      }, 500)
    });
  } catch(e) {
    return false
  }
}