import { environment } from "../../environments/environment";
export class serviceUrl {
	public host = environment.baseURL;

	public register = "registration";
    public login = "login";
}