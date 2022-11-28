import React from 'react';
import { useEffect, useState } from 'react';
import Select from 'react-select'
import { useNavigate } from 'react-router-dom';
import DatePicker, { registerLocale } from 'react-datepicker';
import uk from "date-fns/locale/uk";
import axios from '../../api/axios';
import makeAnimated from 'react-select/animated';
import Form from 'react-bootstrap/Form';
// import {useCreateUpdateMutation, useDeleteMutation} from './eventMutationHooks'
import 'react-datepicker/dist/react-datepicker.css';

import '../../css/Event.css'

const EventForm = ({ event, closeModal }) => {
	const [startAt, setStartDate] = React.useState(event.startAt);
	const [endAt, setEndDate] = React.useState(event.endAt);
	const [title, setTitle] = React.useState(event.title);
	const [email, setEmail] = React.useState(event.email);
	const [description, setDescription] = React.useState(event.description);
	const [category, setCateogry] = React.useState(event.category);
	const [eventId, setEventId] = React.useState(event.id);
	const [userEmail, setUserEmail] = React.useState();

	const [calendarsList, setCalendarsList] = React.useState([]);
	const [calendarId, setCalendarId] = React.useState();

	const [checked, setChecked] = React.useState(false);

	const navigate = useNavigate();

	const handleChange = () => {
		setChecked(!checked);
	};

	const payload = { startAt, endAt, title, email, description, category };

	const eventExists = !!event.title;

	const currentUser = JSON.parse(localStorage.getItem('autorized'));

	const getEmail = async () => {
		const response = await axios.get(`/api/users/${currentUser.userId}`);
		setUserEmail(response.data.values.result.email);
	}

	useEffect(() => {
		getEmail();
	}, [])

	React.useEffect(() => {
		fetch(`/api/calendars/users/${currentUser.userId}`).then(response => response.json()).then(data => {
			setCalendarsList(data.values.result);
		})
	}, [])

	const transformCalendars = calendars =>
		calendars.map(item => {
			return {
				value: item.id,
				label: item.title,
			};
		});


	async function submitEvent() {
		const response = await axios.post(`/api/events`,
			JSON.stringify({
				title: title, description: description,
				email: userEmail, endAt: endAt, startAt: startAt, category_id: category.value,
				allDay: 1, calendar_id: calendarId.value
			}),
			{
				headers: { 'Content-Type': 'application/json' },
				withCredentials: true
			}
		);
		console.log(category)
		window.location.href = "/calendar"
	}

	async function updateEvent() {
		const response = await axios.patch(`/api/events/${eventId}`,
		JSON.stringify({
			title: title, description: description,
			email: userEmail, endAt: endAt, startAt: startAt, category_id: category.value,
			allDay: 1, calendar_id: calendarId.value
		}),
		{
			headers: { 'Content-Type': 'application/json' },
			withCredentials: true
		}
	);
	console.log(category)
	window.location.href = "/calendar"
	}

	async function deleteEvent() {
		const response = await axios.delete(`/api/events/${eventId}`);
		closeModal()
		window.location.href = "/calendar"
	}

	const categoriesOptions = [
		{ value: '1', label: 'Подія' },
		{ value: '2', label: 'Нагадування' },
		{ value: '3', label: 'Задача' }
	]

	const customStyles = {
		control: (provided, state) => ({
			...provided,
			backgroundColor: 'none',
			boxShadow: state.isFocused ? `0 0 0 2px 0 0 #0000` : '',
			transition: 'box-shadow 0.1s ease-in-out',
		}),

		placeholder: (provided) => ({
			...provided,
			color: '#fff',
		}),

		input: (provided) => ({
			...provided,
			color: 'white',
		}),

		option: (provided, state) => ({
			...provided,
			backgroundColor: state.isFocused
				? 'rgb(90, 20, 152)'
				: 'transparent',
			backgroundColor: state.isOptionDisabled ? 'rgb(90, 20, 152)' : 'transparent',
			transition: '0.3s',
			color: '#fff',
		}),
		singleValue: (provided) => ({
			...provided,
			backgroundColor: 'rgb(90, 20, 152)',
			color: 'white'
		}),
		singleValue: (provided) => ({
			...provided,
			color: 'white'
		}),
		menu: (provided) => ({
			...provided,
			backgroundColor: 'rgb(45, 45, 45)',
		}),
	}
	const [selectedValue, setSelectedValue] = useState();
	const animatedComponents = makeAnimated();
	registerLocale("uk", uk);
	return (
		<form
			onSubmit={e => {
				e.preventDefault();
				// createUpdateEvent();
			}}
		>
			<fieldset>
				<div className="container">
					<div className="row">
						<div className="column">
							<label>Початок</label>
							<DatePicker
								selected={startAt}
								locale="uk"
								onChange={date => setStartDate(date)}
								timeFormat="HH:mm"
								timeIntervals={15}
								dateFormat="d MMMM yyyy, HH:mm "
								timeCaption="time"
								showTimeInput
								required
							/>
						</div>
						<div className="column">
							<label>Кінець</label>
							<DatePicker
								selected={endAt}
								onChange={date => setEndDate(date)}
								timeFormat="HH:mm"
								locale="uk"
								timeIntervals={15}
								dateFormat="d MMMM yyyy, HH:mm "
								timeCaption="time"
								showTimeInput
								required
							/>
						</div>
					</div>

					<div className="row">
						<Form.Check className="column ms-3">
						<Form.Check.Input
									type="checkbox"
									checked={checked}
									onChange={handleChange}
								/>
							<Form.Check.Label>
								Відправити нагадування на Email?
							</Form.Check.Label>
						</Form.Check>
					</div>

					<div className="row">
						<div className="column">
							<label htmlFor="title">Назва</label>
							<input
								type="text"
								placeholder="Назва"
								id="title"
								value={title}
								onChange={e => setTitle(e.target.value)}
								required
							/>
						</div>
					</div>

					<div className="row">
						<div className="column">
							<Select
								styles={customStyles}
								placeholder="Тип івенту"
								// value={options.filter(obj => options.includes(obj.value))} 
								components={animatedComponents}
								value={category}// set selected values
								options={categoriesOptions}
								className="mt-3"
								// isOptionDisabled={() => selectedValue.length >= 1} // set list of the data
								onChange={(option) => {
									// console.log(option);
									setCateogry(option);
								}} // assign onChange function
								required
							// isClearable
							/>
						</div>
					</div>

					<div className="row">
						<div className="column">
							<Select
								styles={customStyles}
								placeholder="Виберіть календар"
								value={calendarId}
								components={animatedComponents}
								options={transformCalendars(calendarsList)}
								className="mt-3 text-white"
								// isOptionDisabled={() => calendarId.length >= 1} 
								onChange={(option) => {
									setCalendarId(option);
								}}
								required
							/>
						</div>
					</div>

					<div className="row">
						<div className="column">
							<label htmlFor="description">Опис</label>
							<textarea
								placeholder="Додайте опис"
								id="description"
								columns="50"
								value={description}
								onChange={e => setDescription(e.target.value)}
							/>
						</div>
					</div>

					<div className="d-flex flex-row">
						<div className="column column-50">
							<input
								className="text-white border border-secondary me-4 bg-secondary p-1 rounded"
								type="submit"
								onClick={eventExists ? () => updateEvent() : () => submitEvent()}
								value={eventExists ? 'Оновити' : 'Створити'}
							/>
						</div>
						{eventExists && (
							<div className="column column-50">
								<input
									className="text-white border border-danger bg-danger p-1 rounded"
									type="button"
									onClick={() => deleteEvent()}
									value="Видалити"
								/>
							</div>
						)}
					</div>
				</div>
			</fieldset>
		</form>
	);
};

export default EventForm;