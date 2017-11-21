// Main Inputs Page
// inputs include:
/* 
- date
- location
- people you went with
- restaurants visited
- places visited- food tried
- highlights
- photos (?)
 */


class Inputs extends React.Component {
    render() {
        retuen (
            <div className="main-input-container">
            <form action="" className="date-location-input">
                <label htmlFor="location-travelled">Location Travelled</label>
                <input type="text" id="location-travelled"/>
                <label htmlFor="date-travelled">Date</label>
                <input type="text" id="date-travelled"/>
            </form>

            <form action="" className="group-mates-input">
                <label htmlFor="travel-mates">Who did you go with?</label>
                <input type="text" id="travel-mates"/>
            </form>

            <form action="" className="places-input">
                <label htmlFor="places-visited">Places You Visited</label>
                <input type="text" id="places-visited"/>
                <textarea name="" id="places-visited-textarea" cols="30" rows="10"></textarea>
            </form>

            <form action="" className="restuarants-input">
                <label htmlFor="res-visited"></label>
                <input type="text" id="res-visited"/>
            </form>
            
            </div>
        )
    }
}
