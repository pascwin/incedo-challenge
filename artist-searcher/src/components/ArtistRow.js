export const ArtistRow = ({ name, mbid, url, image_small, image }) => {
    return (
        <tr>
            <td className="table-cell">{name}</td>
            <td className="table-cell">{mbid}</td>
            <td className="table-cell">{url}</td>
            <td className="table-cell">{image}</td>
        </tr>
    )
}