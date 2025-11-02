// src/pages/exam/components/SubmitModal.tsx
import React from 'react';
import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import { useAppSelector } from '../../../app/hooks';

interface SubmitModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

export const SubmitModal: React.FC<SubmitModalProps> = ({ isOpen, onClose, onConfirm }) => {
    const { totalQuestions, answers } = useAppSelector((state) => state.examAttempt);
    const answeredCount = Object.keys(answers).length;
    const remainingCount = totalQuestions - answeredCount;

    return (
        <Transition appear show={isOpen} as={React.Fragment}>
            <Dialog as="div" className="relative z-50" onClose={onClose}>
                <TransitionChild
                    as={React.Fragment}
                    enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100"
                    leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 modal-overlay" />
                </TransitionChild>
                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <TransitionChild
                            as={React.Fragment}
                            enter="ease-out duration-300" enterFrom="opacity-0 scale-95" enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200" leaveFrom="opacity-100 scale-100" leaveTo="opacity-0 scale-95"
                        >
                            <DialogPanel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white dark:bg-gray-800 p-6 text-left align-middle shadow-xl transition-all">
                                <div className="text-center">
                                    <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <ExclamationTriangleIcon className="w-8 h-8 text-red-600 dark:text-red-400" />
                                    </div>
                                    <DialogTitle as="h3" className="text-lg font-semibold leading-6 text-gray-900 dark:text-white mb-2">
                                        Xác nhận nộp bài
                                    </DialogTitle>
                                    <div className="mt-2">
                                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                                            Bạn có chắc chắn muốn nộp bài?
                                            {remainingCount > 0 && (
                                                <><br /><span className="font-medium">Còn {remainingCount} câu chưa trả lời.</span></>
                                            )}
                                        </p>
                                    </div>
                                </div>
                                <div className="mt-6 flex space-x-3">
                                    <button
                                        type="button"
                                        className="inline-flex flex-1 justify-center rounded-lg border border-gray-300 dark:border-gray-600 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus-visible:ring-2"
                                        onClick={onClose}
                                    >
                                        Hủy
                                    </button>
                                    <button
                                        type="button"
                                        className="inline-flex flex-1 justify-center rounded-lg border border-transparent bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus-visible:ring-2"
                                        onClick={onConfirm}
                                    >
                                        Nộp bài
                                    </button>
                                </div>
                            </DialogPanel>
                        </TransitionChild>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
};