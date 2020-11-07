export async function index() {
  const raw = await call("GET", "/contents", 200);
  return raw.contents.map((p: any) => mapPost(p)) as Post[];
}

export async function show(id: string) {
  const raw = await call("GET", `/contents/${id}`, 200);
  return mapPost(raw);
}

function mapPost(json: any): Post {
  const p = json;
  return {
    id: p.id,
    publishedAt: new Date(Date.parse(p.publishedAt)),
    title: p.title,
    body: p.body,
    author: {
      id: p.author.id,
      name: p.author.name,
      picture: p.author.picture,
      description: p.author.description,
    },
    tags: p.tags?.map((t: any) => ({
      id: t.id,
      title: t.title,
    })),
    footNotes: p.footNotes?.map((f: any, index: number) => ({
      index: index + 1,
      content: f.content,
    })),
  };
}

async function call(method: string, path: string, expectedStatus: number) {
  const key = localStorage.getItem("microcms-key");
  const resp = await fetch(`https://cumet04-dev.microcms.io/api/v1${path}`, {
    method,
    headers: {
      "X-API-KEY": key || "",
    },
  });
  if (resp.status != expectedStatus) {
    throw {
      toString: () => "unexpected status code",
      response: resp,
    };
  }
  return resp.json();
}
