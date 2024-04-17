"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Account() {
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showEmailInput, setShowEmailInput] = useState(false);
  const [showPasswordInput, setShowPasswordInput] = useState(false);
  const [error, setError] = useState("");
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const response = await fetch("/api/auth/verifAuth");
        if (response.ok) {
          setIsLoggedIn(true);
        } else {
          router.push("/"); // Redirection vers '/' si l'utilisateur n'est pas connecté
        }
      } catch (error) {
        console.error(
          "Erreur lors de la vérification du statut de connexion : ",
          error
        );
        router.push("/"); // Redirection en cas d'erreur de vérification
      }
    };

    checkLoginStatus();
  }, []);

  useEffect(() => {
    console.log("User is logged in:", isLoggedIn);
  }, [isLoggedIn]);

  const handleChangeEmail = async () => {
    try {
      if (!isValidEmail(newEmail)) {
        setError("Invalid email format");
        return;
      }

      console.log("Sending request to update email");
      const response = await fetch("/api/auth/UpdateEmail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ newEmail }),
        credentials: "include",
      });

      if (response.ok) {
        console.log("Email updated successfully");
      } else {
        console.error("Error updating email. Status:", response.status);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleChangePassword = async () => {
    try {
      if (!isValidPassword(newPassword)) {
        setError("Password must be at least 8 characters long");
        return;
      }

      console.log("Sending request to update password");
      const response = await fetch("/api/auth/UpdatePassword", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ newPassword }),
        credentials: "include",
      });

      if (response.ok) {
        console.log("Password updated successfully");
      } else {
        console.error("Error updating password. Status:", response.status);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleDeleteAccount = async () => {
    // Afficher une alerte de confirmation avant de supprimer le compte
    setShowDeleteConfirmation(true);
  };

  const confirmDeleteAccount = async () => {
    try {
      console.log("Sending request to delete account");
      const response = await fetch("/api/auth/DeleteAccount", {
        method: "POST",
        credentials: "include",
      });

      if (response.ok) {
        console.log("Account deleted successfully");
        try {
          await fetch("/api/auth/logout", {
            method: "POST",
          });
          // Effacer le token JWT stocké en supprimant le cookie
          document.cookie =
            "jwtToken=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT;";
        } catch (error) {
          console.error("Erreur lors de la déconnexion :", error);
        }
        // Rediriger l'utilisateur vers la page de déconnexion ou la page d'accueil
        router.push("/");
      } else {
        console.error("Error deleting account. Status:", response.status);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
      });
      // Effacer le token JWT stocké en supprimant le cookie
      document.cookie =
        "jwtToken=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT;";
      router.push("/");
    } catch (error) {
      console.error("Erreur lors de la déconnexion :", error);
    }
  };

  const isValidEmail = (email: any) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isValidPassword = (password: any) => {
    return password.length >= 8;
  };

  const handleButtonClick = (type: any) => {
    switch (type) {
      case "email":
        setShowEmailInput(true);
        setShowPasswordInput(false);
        setError("");
        break;
      case "password":
        setShowPasswordInput(true);
        setShowEmailInput(false);
        setError("");
        break;
      case "cancel":
        setShowEmailInput(false);
        setShowPasswordInput(false);
        setNewEmail("");
        setNewPassword("");
        setError("");
        break;
      default:
        break;
    }
  };

  return (
    <>
      <div className="flex justify-center">
        <Image
          src="/Icon.svg"
          width={58}
          height={58}
          alt="Icon site web"
          className="mb-4"
          loading="lazy"
        />
      </div>
      <div className="mx-6 md:mx-36 mt-36 flex flex-col gap-5">
        <h1 className="font-custom font-bold">Account Page</h1>
        <p>This is the account page</p>
        <div className="flex flex-col items-center gap-5">
          {showEmailInput && (
            <>
              <input
                type="email"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                placeholder="Enter new email"
                className="border-[1px] border-solid rounded border-grayBorder w-full text-center"
              />
              <div className="flex gap-3">
                <button
                  onClick={handleChangeEmail}
                  className="border-[1px] border-solid rounded border-grayBorder w-full text-center"
                >
                  Send
                </button>
                <button
                  onClick={() => handleButtonClick("cancel")}
                  className="border-[1px] border-solid rounded border-grayBorder w-full text-center"
                >
                  Cancel
                </button>
              </div>
            </>
          )}

          {showPasswordInput && (
            <>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password"
                className="border-[1px] border-solid rounded border-grayBorder w-full text-center"
              />
              <div className="flex gap-3">
                <button
                  onClick={handleChangePassword}
                  className="border-[1px] border-solid rounded border-grayBorder w-full text-center"
                >
                  Send
                </button>
                <button
                  onClick={() => handleButtonClick("cancel")}
                  className="border-[1px] border-solid rounded border-grayBorder w-full text-center"
                >
                  Cancel
                </button>
              </div>
            </>
          )}

          {!showEmailInput && (
            <button
              onClick={() => handleButtonClick("email")}
              className="border-[1px] border-solid rounded border-grayBorder w-full text-center"
            >
              Change my email
            </button>
          )}

          {!showPasswordInput && (
            <button
              onClick={() => handleButtonClick("password")}
              className="border-[1px] border-solid rounded border-grayBorder w-full text-center"
            >
              Change my password
            </button>
          )}

          {error && <p className="text-red-500">{error}</p>}

          {showDeleteConfirmation && (
            <div className="flex flex-col items-center gap-3">
              <p>Are you sure you want to delete your account?</p>
              <button
                onClick={confirmDeleteAccount}
                className="border-[1px] border-solid rounded border-grayBorder w-full text-center"
              >
                Yes, delete my account
              </button>
              <button
                onClick={() => setShowDeleteConfirmation(false)}
                className="border-[1px] border-solid rounded border-grayBorder w-full text-center"
              >
                Cancel
              </button>
            </div>
          )}

          {!showDeleteConfirmation && (
            <button
              onClick={handleDeleteAccount}
              className="border-[1px] border-solid rounded border-grayBorder w-full text-center"
            >
              Delete account
            </button>
          )}
          <button
            onClick={handleLogout}
            className="text-red-500 font-semibold hover:text-red-700"
          >
            Se déconnecter
          </button>
        </div>
      </div>
    </>
  );
}
