async function getMetadata(query) {
	const url = new URL('https://radioapi.lat/search')

	url.searchParams.set('query', query)
	url.searchParams.set('service', 'spotify')

	const res = await fetch(url)
	const data = await res.json()

	return data
}

function isJingle(query) {
	return query.toLowerCase().includes('jingle')
}

async function customAction(data) {
	const $artist = document.querySelectorAll('.rk-current-artist')
	const $song = document.querySelectorAll('.rk-current-song')
	const $thumbnail = document.querySelectorAll('.rk-current-thumbnail')
	const $prevSong = document.querySelectorAll('.rk-prev-song')
	const $prevArtist = document.querySelectorAll('.rk-prev-artist')
	const $prevThumbnail = document.querySelectorAll('.rk-prev-thumbnail')

	let prev = data.history.at(0)

	console.log(prev.song, isJingle(prev.song))

	if (isJingle(prev.song)) {
		prev = data.history.at(1)
	} 

	$thumbnail.forEach(($item) => {
		$item.src = data.current.art
	})

	$artist.forEach(($item) => {
		$item.textContent = data.current.artist
	})

	$song.forEach(($item) => {
		$item.textContent = data.current.title
	})

	const metadata = await getMetadata(`${prev.artist} - ${prev.song}`)

	$prevArtist.forEach(($item) => {
		$item.textContent = metadata.results.artist
	})

	$prevSong.forEach(($item) => {
		$item.textContent = metadata.results.title
	})

	$prevThumbnail.forEach(($item) => {
		$item.src = metadata.results.artwork
	})
}
