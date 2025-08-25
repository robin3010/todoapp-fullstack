export const genError = () => {
  const rnd = Math.random()
  console.log({ rnd })
  if (rnd > 0.3) throw new Error('Uh-oh, something went wrong')
}
