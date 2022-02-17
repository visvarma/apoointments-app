import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import './index.css'
import {format} from 'date-fns'
import AppointmentItem from '../AppointmentItem'

class Appointments extends Component {
  state = {
    title: '',
    date: '',
    apList: [],
    starFilter: false,
  }

  onChangeTitle = event => {
    this.setState({title: event.target.value})
  }

  onChangeDate = event => {
    this.setState({date: event.target.value})
  }

  onAddAppointment = event => {
    event.preventDefault()
    const {title, date} = this.state
    const formattedDate = date
      ? format(new Date(date), 'dd MMMM yyyy, EEEE')
      : ''
    const newAppointment = {
      id: uuidv4(),
      title,
      date: formattedDate,
      isStarred: false,
    }

    this.setState(prevState => ({
      apList: [...prevState.apList, newAppointment],
      title: '',
      date: '',
    }))
  }

  onFilter = () => {
    const {starFilter} = this.state

    this.setState({
      starFilter: !starFilter,
    })
  }

  onStarred = id => {
    this.setState(prevState => ({
      apList: prevState.apList.map(item => {
        if (item.id === id) {
          return {...item, isStarred: !item.isStarred}
        }
        return item
      }),
    }))
  }

  getFilteredAppointmentsList = () => {
    const {apList, starFilter} = this.state

    if (starFilter) {
      return apList.filter(
        eachTransaction => eachTransaction.isStarred === true,
      )
    }
    return apList
  }

  render() {
    const {title, date, starFilter} = this.state

    const filterClassName = starFilter ? 'filter-filled' : 'filter-empty'
    const filteredAppointmentsList = this.getFilteredAppointmentsList()

    return (
      <div className="app-container">
        <div className="appointment-container">
          <div className="main-container">
            <div className="form-container">
              <h1>Add Appointment</h1>
              <form onSubmit={this.onAddAppointment}>
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  id="title"
                  value={title}
                  onChange={this.onChangeTitle}
                />

                <label htmlFor="date">Date</label>
                <input
                  type="date"
                  id="date"
                  value={date}
                  onChange={this.onChangeDate}
                />

                <button type="submit">Add</button>
              </form>
            </div>
            <div className="img-container">
              <img
                className="appointments-img"
                src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
                alt="appointments"
              />
            </div>
          </div>
          <hr />

          <div className="appointment-list-heading-container">
            <h1>Appointments</h1>
            <button
              type="button"
              className={filterClassName}
              onClick={this.onFilter}
            >
              Starred
            </button>
          </div>

          <ul className="appointments-list">
            {filteredAppointmentsList.map(ap => (
              <AppointmentItem
                appointment={ap}
                key={ap.id}
                Starring={this.onStarred}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default Appointments
