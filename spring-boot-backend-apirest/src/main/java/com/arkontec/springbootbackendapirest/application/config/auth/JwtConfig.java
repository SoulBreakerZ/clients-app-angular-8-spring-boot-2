package com.arkontec.springbootbackendapirest.application.config.auth;

public class JwtConfig {

    public static final String SECRET_KEY = "alguna.clave.secreta.12345678";

    public static final String RSA_PUBLIC = "-----BEGIN PUBLIC KEY-----\n" +
            "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAveUG+jOsuqM9/iVSVNqM\n" +
            "M1YMaEQT4CdNBx41dVgrlYs8BeWQBsjIl03F3PVsWlsZLXxh70db7EQPJXJh0AKN\n" +
            "TIOs88PxpMdbB2/SxMKEPRj/9jMiXzSN5HtgrqwYLLLf55R0+LrNrYFXSvr9p8pT\n" +
            "gJp7Ij7sJ1r8/yho4c52HA3Oid2HlJWy/j/1kv5AIZqJe7C3ZhJ4MTBjQv5qSZeb\n" +
            "DCvcaU20iYgVT6ke4l+ulsKKZf13tPwdbqR5Ai7sHRB60UeaAgnGmVQyGs/zpZas\n" +
            "zeMB39LcT+LM5YK3bA4oJa8nRrYeUrDoHKS14znk9pvybeoKI+17xkt30eTeLiOF\n" +
            "XwIDAQAB\n" +
            "-----END PUBLIC KEY-----";

    public static String RSA_PRIVATE="-----BEGIN RSA PRIVATE KEY-----\n" +
            "MIIEpgIBAAKCAQEAveUG+jOsuqM9/iVSVNqMM1YMaEQT4CdNBx41dVgrlYs8BeWQ\n" +
            "BsjIl03F3PVsWlsZLXxh70db7EQPJXJh0AKNTIOs88PxpMdbB2/SxMKEPRj/9jMi\n" +
            "XzSN5HtgrqwYLLLf55R0+LrNrYFXSvr9p8pTgJp7Ij7sJ1r8/yho4c52HA3Oid2H\n" +
            "lJWy/j/1kv5AIZqJe7C3ZhJ4MTBjQv5qSZebDCvcaU20iYgVT6ke4l+ulsKKZf13\n" +
            "tPwdbqR5Ai7sHRB60UeaAgnGmVQyGs/zpZaszeMB39LcT+LM5YK3bA4oJa8nRrYe\n" +
            "UrDoHKS14znk9pvybeoKI+17xkt30eTeLiOFXwIDAQABAoIBAQCtENvAEnJ9EyP/\n" +
            "yWH05c3bR7Q9HraCly7zqsuL69SlEWWd9i/CjyGKDB6ll6Ot4dLbir3zBrU3anvn\n" +
            "ZAzTOFAxCN0KuW01AV/sMjUEkEdXK760UrwjytD7CJr/9uZ9bnT0KXBF9HJZjETT\n" +
            "mFavoo1h6ukIOBKgd6OWpOyZx8ILI9RJRPBX+8X03rq4eIAl3F6ryASVnxJ8HcA1\n" +
            "lsuJLFBZ/+yYX1h9MNu4fiIeRmhRbh5ryZ2/1atuSumNl5PH9i+sC3ZvRbXfI4+F\n" +
            "Nwx7eq7s3x6nT32y7pzYpzzsW4DY0PdyWix+rfMswK7Anov4I8aW1+AJcj6rvCjf\n" +
            "MzFK84cBAoGBAN842eo6a1CMhXdniiNDWCRu1EaC/+68JLW/VKnzbFlkS/+9ML+/\n" +
            "HeCn6S/+OiHSfMDJQNKrBBcYh8ydNe65QiVQfRCh/gYnYrpWqKfpAgfDq8MoucHN\n" +
            "oPxFaNuIZdOF5FmLmC5Rxxsb3bu0HOrF2A28U9rb2Nmmm7UGzlWfxoyBAoGBANnH\n" +
            "XPirrCK5trBJDmK2My+Fe+nwUm2ixJagH024R/DKO/3p2FDs0TqwQPuWxNDm/wEl\n" +
            "jQqyfloYExleZbUgC0hohepRUHBfzHNuArHJ9xay2Wm+vUrlbzNbbPiYM0Ldph9p\n" +
            "ofXqJN38TIlGpphCrF5WRnKvvtf9mbyZNPzg0qHfAoGBAK0CmEulycVdlJiOZI+e\n" +
            "Q7PBPsAECq+TnXRMfidXJzRFu23UyfLkAxk7q03qYk4SoWSe16IwsHPiLGbXtpR3\n" +
            "fCAFuVlp5MQKRMgeIIw72boA26DgcNEYOl0swu/cUOfYD7ujqWjFM2f8eihgmkUQ\n" +
            "4LsMq4Wm/fT74BU32DafJrmBAoGBAK/aREConz8LJ3ICDBO5fGuLJhwpauYM4SGf\n" +
            "+qcPf0f4hajrAzmVgP4bBN4jSJpHbPLIF7PjnhOyDPoXN5miXnoBrOEg+AtF0BoF\n" +
            "YzedFmDF2rmAw+mOitS1prC2de4wfMwwyA+DGnIGIOdYnX2lmPo0QH6rWzeeGF4q\n" +
            "eJcaE/uRAoGBAICGJPxU+oyqyk96OOWNVNzSqxa42kNYbQHBYo7koZ85mzZE20C8\n" +
            "3LWpFcvav2tVq0+ZPHDmEynikPHAEUikaPE67DCgRE8T4sv8xvNdS0VDdLmszLfr\n" +
            "Q8SaJ6RHW2UW13FW+RTJcpXs/NChCc2RP2khqMZjaeaar931VZrcRGfL\n" +
            "-----END RSA PRIVATE KEY-----";
}
