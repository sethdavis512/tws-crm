import { redirect } from '@remix-run/node';
import { Urls } from '~/utils/constants';

export async function loader() {
    return redirect(Urls.DASHBOARD);
}
