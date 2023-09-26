import bcrypt from "bcryptjs";
async function passwordCompare(
  candidatePassword: string,
  userPassword: string
) {
  return await bcrypt.compare(candidatePassword, userPassword);
}
export default passwordCompare;
