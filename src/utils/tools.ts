import queryString from "query-string";


export const nextTick = async (frames = 1) => {
  const _nextTick = async (idx: number) => {
    return new Promise((resolve) => {
      requestAnimationFrame(() => resolve(idx));
    });
  };
  for (let i = 0; i < frames; i++) {
    await _nextTick(i);
  }
};

export function removeEmpty<T = any>(data: T): T {
  if (Array.isArray(data)) {
    return data.filter((e) => e != undefined) as any;
  }
  const res = {} as any;
  for (const key in data) {
    if (data[key] != undefined) {
      res[key] = data[key];
    }
  }
  return res;
}


export const deepClone = <T>(obj: T): T => {
  if (obj === null || typeof obj !== "object") {
    return obj;
  }

  if (Array.isArray(obj)) {
    const copy: any[] = [];
    obj.forEach((item, index) => {
      copy[index] = deepClone(item);
    });

    return copy as unknown as T;
  }

  const copy = {} as T;

  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      (copy as any)[key] = deepClone((obj as any)[key]);
    }
  }

  return copy;
};

export const lastOf = <T = any>(datas?: T[]) =>
  datas ? (datas.length < 1 ? undefined : datas[datas.length - 1]) : undefined;

export function uuid(): string {
  const uuid = new Array(36);
  for (let i = 0; i < 36; i++) {
    uuid[i] = Math.floor(Math.random() * 16);
  }
  uuid[14] = 4;
  uuid[19] = uuid[19] &= ~(1 << 2);
  uuid[19] = uuid[19] |= 1 << 3;
  uuid[8] = uuid[13] = uuid[18] = uuid[23] = "-";
  return uuid.map((x) => x.toString(16)).join("");
}

export const getTypeId = () => {
  const urlSearchObj = queryString.parse(location.search);
  if (urlSearchObj && urlSearchObj.id) {
    return urlSearchObj.id as string;
  }
  return "";
};
