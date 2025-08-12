export default function Home() {
  return (
    <form>
      <label htmlFor="email">Email:</label>      
      <input id="email" name="email" type="email" required />
      <br></br>

      <label htmlFor="action">Actions:</label>      
      <br></br>

      <input id="clock-in" name="action" type="radio" required />
      <label htmlFor="clock-in"> Clock in</label>
      <br></br>

      <input id="clock-out" name="action" type="radio" required />
      <label htmlFor="clock-out"> Clock out</label>
      <br></br>

      <input id="request-paid-leave" name="action" type="radio" required />
      <label htmlFor="request-paid-leave"> Request Paid Leave</label>
      <br></br>

      <input id="declare-sick-leave" name="action" type="radio" required />
      <label htmlFor="declare-sick-leave"> Declare Sick Leave</label>
      <br></br>

      {/* <button formAction={login}>Log in</button> */}
      <br></br>


    </form>
  );
}
