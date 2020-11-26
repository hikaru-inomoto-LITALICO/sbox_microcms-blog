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
    description: p.description,
    visual: p.visual?.url,
    categories: p.categories?.map((v: any) => mapCategory(v)),
    contents: p.contents.map((v: any) => mapContent(v)),
    supervisors: p.supervisors?.map((v: any) => mapSupervisor(v)),
  };
}

const mapCategory = (json: any): Category => ({
  id: json.id,
  title: json.title,
});

const mapContent = (json: any): Section | Image => {
  switch (json.fieldId) {
    case "section":
      return {
        type: "section",
        html: json.content,
      };
    case "image":
      return {
        type: "image",
        src: json.src.url,
        alt: json?.alt,
      };
    default:
      const msg = `unknown content fieldId: ${json.fieldId}`;
      alert(msg);
      throw `${msg}\n${json}`;
  }
};

const mapSupervisor = (json: any): Supervisor => ({
  id: json.id,
  name: json.name,
  picture: json?.picture?.url,
  description: json?.description,
});

// api ------

async function call(method: string, path: string, expectedStatus: number) {
  const resp = await fetch(`https://${apiName()}.microcms.io/api/v1${path}`, {
    method,
    headers: {
      "X-API-KEY": apikey(),
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

function apiName() {
  const key = "__microcms_api_name__"; // This is replaced by vite(rollup)
  const crackedPlaceholder = "__microcms_api_name_";
  if (key.includes(crackedPlaceholder)) {
    // key is not replaced = on development env
    return localStorage.getItem("microcms-name") || "";
  } else {
    return key;
  }
}

function apikey() {
  const key = "__microcms_api_key__"; // This is replaced by vite(rollup)
  const crackedPlaceholder = "__microcms_api_key_";
  if (key.includes(crackedPlaceholder)) {
    // key is not replaced = on development env
    return localStorage.getItem("microcms-key") || "";
  } else {
    return key;
  }
}
