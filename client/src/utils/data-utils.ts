
  export const getData = async <T>(
    url: string,
    { name, rank, base, role, id, suspect, signatureImage}: { name: string, rank: string, base: string, role: string, id: string, suspect: object, signatureImage: any },
  )
  : Promise<T> => {
    const res = await fetch(url, {
      method: 'Post',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({ name, rank, base, role, id, suspect, signatureImage }),
    });

    return await res.json();
  }
  