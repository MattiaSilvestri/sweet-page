export async function getPoetry(linecount) {
  const data = [];
  for (let i = 0; i < linecount; i++) {
    const res = await fetch(`https://poetrydb.org/random,linecount/1;${i + 1}`);
    data[i] = await res.json();
  }
  poetry = data[Math.floor(Math.random() * linecount)][0];
  poetry.formatted = poetry.lines.join("\n");

  return poetry;
}
