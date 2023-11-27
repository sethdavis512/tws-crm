import {
    json,
    type ActionFunctionArgs,
    redirect,
    type LoaderFunctionArgs
} from '@remix-run/node';
import { Form } from '@remix-run/react';
import { useState } from 'react';
import { Button } from '~/components/Button';
import { Heading } from '~/components/Heading';
import { Input } from '~/components/Input';
import { Label } from '~/components/Label';
import { getUser, login, register } from '~/utils/auth.server';
import { Urls } from '~/utils/constants';
import {
    validateEmail,
    validateName,
    validatePassword
} from '~/utils/validator.server';

export async function loader({ request }: LoaderFunctionArgs) {
    return (await getUser(request)) ? redirect(Urls.DASHBOARD) : null;
}

export async function action({ request }: ActionFunctionArgs): Promise<any> {
    const form = await request.formData();
    const intent = form.get('intent');

    const email = form.get('email');
    const password = form.get('password');

    let firstName = form.get('firstName');
    let lastName = form.get('lastName');

    if (
        typeof intent !== 'string' ||
        typeof email !== 'string' ||
        typeof password !== 'string'
    ) {
        return json(
            { error: `Invalid Form Data`, form: intent },
            { status: 400 }
        );
    }

    if (
        intent === 'register' &&
        (typeof firstName !== 'string' || typeof lastName !== 'string')
    ) {
        return json(
            { error: `Invalid Form Data`, form: intent },
            { status: 400 }
        );
    }

    const errors = {
        email: validateEmail(email),
        password: validatePassword(password),
        ...(intent === 'register'
            ? {
                  firstName: validateName((firstName as string) || ''),
                  lastName: validateName((lastName as string) || '')
              }
            : {})
    };

    if (Object.values(errors).some(Boolean))
        return json(
            {
                errors,
                fields: { email, password, firstName, lastName },
                form: intent
            },
            { status: 400 }
        );

    if (intent === 'login') {
        return await login({ email, password });
    } else if (intent === 'register') {
        firstName = firstName as string;
        lastName = lastName as string;

        return await register({ email, password, firstName, lastName });
    } else {
        return json({ error: `Invalid Form Data` }, { status: 400 });
    }
}

type LoginActionType = 'login' | 'register';

export default function LoginRoute() {
    const [action, setAction] = useState<LoginActionType>('login');

    const [formData, setFormData] = useState({
        email: '',
        password: '',
        firstName: '',
        lastName: ''
    });

    const handleInputChange = (
        event: React.ChangeEvent<HTMLInputElement>,
        field: string
    ) => {
        setFormData((form) => ({ ...form, [field]: event.target.value }));
    };

    const handleLoginType = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAction(event?.currentTarget.value as LoginActionType);
    };

    return (
        <Form method="POST" className="col-span-4 col-start-5 mt-12">
            <Heading as="h1" size="1" className="mb-8">
                {action === 'login' ? 'Login' : 'Register'}
            </Heading>
            <ul className="my-8 items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                    <div className="flex items-center ps-3">
                        <input
                            id="horizontal-list-radio-license"
                            type="radio"
                            value="register"
                            name="list-radio"
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                            onChange={handleLoginType}
                            checked={action === 'register'}
                        />
                        <label
                            htmlFor="horizontal-list-radio-license"
                            className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                            Register
                        </label>
                    </div>
                </li>
                <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                    <div className="flex items-center ps-3">
                        <input
                            id="horizontal-list-radio-id"
                            type="radio"
                            value="login"
                            name="list-radio"
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                            onChange={handleLoginType}
                            checked={action === 'login'}
                        />
                        <label
                            htmlFor="horizontal-list-radio-id"
                            className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                            Login
                        </label>
                    </div>
                </li>
            </ul>

            <Label htmlFor="email">Email</Label>
            <Input
                className="mb-4"
                id="email"
                type="email"
                name="email"
                onChange={(event) => handleInputChange(event, 'email')}
                value={formData.email}
            />
            <Label htmlFor="password">Password</Label>
            <Input
                className={`mb-${action === 'login' ? '8' : '4'}`}
                id="password"
                type="password"
                name="password"
                onChange={(event) => handleInputChange(event, 'password')}
                value={formData.password}
            />
            {action === 'register' && (
                <>
                    <Label htmlFor="firstName">First name</Label>
                    <Input
                        className="mb-4"
                        id="firstName"
                        name="firstName"
                        onChange={(event) =>
                            handleInputChange(event, 'firstName')
                        }
                        value={formData.firstName}
                    />
                    <Label htmlFor="lastName">Last name</Label>
                    <Input
                        className="mb-8"
                        id="lastName"
                        name="lastName"
                        onChange={(event) =>
                            handleInputChange(event, 'lastName')
                        }
                        value={formData.lastName}
                    />
                </>
            )}
            <Button
                variant="primary"
                size="md"
                name="intent"
                type="submit"
                value={action}
            >
                {action === 'login' ? 'Login' : 'Register'}
            </Button>
        </Form>
    );
}
