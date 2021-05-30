import React, { useCallback } from 'react';
import axios from 'axios'
import { Controller, useForm } from 'react-hook-form'

function Field({
    channelId = 10028028,
    minAmount = 1,
    maxAmount = 1000,
}) {

    const {
        control,
        handleSubmit,
        errors,
        formState,
        setValue,
    } = useForm({
        mode: 'onChange',
        reValidateMode: 'onChange',
    })

    const { isDirty, isValid } = formState

    const onSubmit = useCallback(async formData => {
        try {
            const res = await axios({
                url: `https://b1eec85d-74ec-4d9e-b25f-58f7873ffb97.mock.pstmn.io/v1/api/Deposit/${channelId}/${Number(formData.amount)}`,
                method: 'post',
                // data: {
                //     channelId,
                //     requestAmount: Number(formData.amount),
                // },
            })

            if (res.data.code === '0000') {
                alert('完成充值')
                console.log('res', res.data.data)
            } else {
                alert('no ok')
            }
        } catch (err) {
            console.log('err', err)
            alert(err)
        }
    }, [])


    return (
        <div className="px-3 py-4">
            <form onSubmit={handleSubmit(onSubmit)}>
                <Controller
                    name="amount"
                    control={control}
                    defaultValue=""
                    rules={{ required: true, min: minAmount, max: maxAmount }}
                    render={({ onChange, value }) => (
                        <input
                            type="number"
                            value={value}
                            className="w-full px-4 py-2 border border-gray-300 rounded text-right text-title-6 bg-transparent text-gray-500 dark:text-white"
                            style={{ height: '44px' }}
                            placeholder="請輸入金額"
                            onChange={onChange}
                        />
                    )}
                />
                <div className="py-2">
                    <ol className="pl-4 list-decimal text-red text-body-8">
                        <li className="py-1">
                            若为支付宝充值到银行卡，为加速平台对款，充值金额将依申请金额随机调整
                            <span> ± 0.00 ~ 0.99</span>
                        </li>
                        <li className="py-1">附言内容请务必填入银行备注栏位</li>
                    </ol>
                </div>
                <div className="flex bg-blue-200 text-body-4 text-center items-center justify-center rounded-full" style={{ height: '44px' }}>
                    <button
                        type="submit"
                        className="w-full h-full"
                        disabled={!isDirty || !isValid}
                    >
                        立即支付
                    </button>
                </div>
            </form>
        </div>
    )
}

export default Field
