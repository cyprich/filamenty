import PropTypes from "prop-types";

function FilamentInfo({item}) {
   return (
       <table>
           <tbody>
           <tr>
               <td>Temp</td>
               <td> : {item.temp_min} - {item.temp_max} °C</td>
           </tr>
           <tr>
               <td>Bed</td>
               <td> : {item.temp_bed_min} {item.temp_bed_max ? `- ${item.temp_bed_max}` : ""} °C</td>
           </tr>
           <tr>
               <td>Weight</td>
               <td> : {item.weight_orig / 1000} kg</td>
           </tr>
           <tr>
               <td>Spool</td>
               <td> : {item.weight_spool} g</td>
           </tr>
           <tr>
               <td>Price</td>
               <td> : {(item.price / (item.weight_orig / 1000)).toFixed(2)} €/kg</td>
           </tr>
           </tbody>
       </table>)
}

FilamentInfo.propTypes = {
    item: PropTypes.arrayOf(PropTypes.shape({
        price: PropTypes.number.isRequired,
        weight: PropTypes.number.isRequired,
        weight_orig: PropTypes.number.isRequired,
        weight_spool: PropTypes.number.isRequired,
        temp_min: PropTypes.number.isRequired,
        temp_max: PropTypes.number.isRequired,
        temp_bed_min: PropTypes.number.isRequired,
        temp_bed_max: PropTypes.number,
    })).isRequired
};



export default FilamentInfo