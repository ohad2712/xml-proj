
  export const getData = async <T>(
    url: string,
    { name, rank, base, role, id, suspect}: { name: string, rank: string, base: string, role: string, id: string, suspect: object },
  )
  : Promise<T> => {
    const res = await fetch(url, {
      method: 'Post',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({ name, rank, base, role, id, suspect }),
    });

    return await res.json();
  }
  