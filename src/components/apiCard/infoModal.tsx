import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { uauth } from "../../constants/unstoppableDomains";

interface Props {
  showModal: boolean;
  closeModal: () => void;
  data?: any;
}

export const InfoModal = ({ closeModal, showModal, data }: Props) => {
  const authorization = localStorage.getItem("username");
  const login = async () => {
    try {
      await uauth.login();
    } catch (err) {
      console.log(err);
    }
  };
  
  return (
    <Transition appear show={showModal} as={Fragment}>
      <Dialog as="div" className="relative z-[100]" onClose={() => {}}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  {data.title}
                </Dialog.Title>
                <div>
                  <img
                    alt={data.title}
                    className="rounded mb-2"
                    src={data.image}
                  />
                  {authorization ? (
                    <div>
                        <p>{data?.description}</p>
                    </div>
                  ) : (
                    <div className="text-center">
                      <p>
                        You're not logged in, authorize in order to access full
                        details of the token
                      </p>
                      <button
                        type="button"
                        className="mx-auto -translate-y-2 justify-center rounded-md border border-transparent bg-green-100 px-4 py-2 text-sm font-medium text-green-900 hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2"
                        onClick={() => {
                          closeModal();
                          login();
                        }}
                      >
                        Login with unstoppable
                      </button>
                    </div>
                  )}
                </div>

                <div className="mt-2 text-center">
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    onClick={closeModal}
                  >
                    Got it, thanks!
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};
