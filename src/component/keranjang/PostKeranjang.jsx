import React, {useState} from 'react'

const PostKeranjang = (brg) => {

  const [count, setCount] = useState(brg.qty);

  return (
    <tr>
      <td align="center">{brg.no}</td>
      {/* <td align="center">{brg.id}</td> */}
      <td align="center">{brg.nama}</td>
      <td align="center"><img src={brg.gambar} alt="gambar" width="150" height="150" /></td>
      <td align="center">{brg.harga}</td>
      <td align="center">
        <button className="btn-update-keranjang" onClick={() => setCount(count - 1)}>-</button>
        <input style={{width:"50px", paddingLeft:"10px"}} type="text" value={count} disabled/>
        <button className="btn-update-keranjang" onClick={() => setCount(count + 1)}>+</button>
      </td>
      <td align="center">{brg.harga * brg.qty}</td>
      <td align="center">
        <button style={{marginRight:"10px"}} className="btn-hapus-keranjang" onClick={() => { if (window.confirm("Apakah anda yakin mengupdate produk ini ?")) brg.updateTelevisi(brg.id, brg.nama, brg.harga, brg.gambar, brg.stok, count) }}>Update</button>
        <button className="btn-hapus-keranjang" onClick={() => { if (window.confirm("Apakah anda yakin menghapus produk ini ?")) brg.hapusTelevisi(brg.id) }}>Hapus</button>
      </td>
    </tr>
  )
}

export default PostKeranjang;