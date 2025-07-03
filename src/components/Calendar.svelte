<style>
	.calendar {
		width: 100%;
		border-radius: 8px;
		padding: 1rem;
		font-family: sans-serif;
		background: transparent;
		color: #fff;
	}
	.calendar-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 1rem;
	}
	.calendar-header button {
		background: transparent;
		color: #fff;
		border: 1px solid #fff;
		border-radius: 4px;
		padding: 0.25rem 0.75rem;
		cursor: pointer;
	}
	.calendar-header button:hover {
		background: #fff;
		color: #000;
	}
	.calendar-grid {
		display: grid;
		grid-template-columns: repeat(7, 1fr);
		gap: 0.25rem;
	}
	.calendar-day,
	.calendar-cell {
		text-align: center;
		padding: 0.5rem 0;
		border: 1px solid #fff;
		background: transparent;
		color: #fff;
	}
	.calendar-cell.today {
		background: #fff;
		color: #000;
		border-radius: 50%;
	}
</style>
<script>
	let today = new Date();
	let year = today.getFullYear();
	let month = today.getMonth();

	const monthNames = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December",
	];

	function getMonthDays(year, month) {
		const firstDay = new Date(year, month, 1).getDay();
		const daysInMonth = new Date(year, month + 1, 0).getDate();
		const days = [];
		let day = 1 - firstDay;
		for (let i = 0; i < 6; i++) {
			const week = [];
			for (let j = 0; j < 7; j++) {
				if (day > 0 && day <= daysInMonth) {
					week.push(day);
				} else {
					week.push("");
				}
				day++;
			}
			days.push(week);
		}
		return days;
	}

	function prevMonth() {
		if (month === 0) {
			month = 11;
			year -= 1;
		} else {
			month -= 1;
		}
	}

	function nextMonth() {
		if (month === 11) {
			month = 0;
			year += 1;
		} else {
			month += 1;
		}
	}
</script>

<div class="calendar">
	<div class="calendar-header">
		<button on:click={() => { prevMonth(); }}>{"<"}</button>
		<span>{monthNames[month]} {year}</span>
		<button on:click={() => { nextMonth(); }}>{">"}</button>
	</div>
	<div class="calendar-grid">
		{#each getMonthDays(year, month).flat() as d, i}
			<div
				class="calendar-cell {d === today.getDate() && month === today.getMonth() && year === today.getFullYear() ? 'today' : ''}">
				{d || ""}
			</div>
		{/each}
	</div>
</div>
