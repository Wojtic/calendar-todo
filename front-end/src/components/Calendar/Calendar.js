import React from 'react'

export default function Calendar() {
    return (
        <table className="calendar">
            <tbody>
                <tr>
                    <th></th>
                    <th className="hours">
                        <p>8:30</p>
                        <p>9:00</p>
                        <p>9:30</p>
                        <p>10:00</p>
                        <p>10:30</p>
                        <p>11:00</p>
                        <p>11:30</p>
                        <p>12:00</p>
                        <p>12:30</p>
                        <p>13:00</p>
                        <p>13:30</p>
                        <p>14:00</p>
                        <p>14:30</p>
                        <p>15:00</p>
                        <p>15:30</p>
                        <p>16:00</p>
                        <p>16:30</p>
                        <p>17:00</p>
                    </th>
                </tr>
                <tr className="day">
                    <td><p>Pondělí</p></td>
                    <td id="Monday" className="events"></td>
                </tr>
                <tr className="day">
                    <td><p>Úterý</p></td>
                    <td id="Tuesday" className="events"></td>
                </tr>
                <tr className="day">
                    <td><p>Středa</p></td>
                    <td id="Wednesday" className="events"></td>
                </tr>
                <tr className="day">
                    <td><p>Čtvrtek</p></td>
                    <td id="Thursday" className="events"></td>
                </tr>
                <tr className="day">
                    <td><p>Pátek</p></td>
                    <td id="Friday" className="events"></td>
                </tr>
            </tbody>
        </table>
    )
}
