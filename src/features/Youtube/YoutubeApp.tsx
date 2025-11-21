import {
    ArrowDownOutlined,
    DeleteOutlined,
    Loading3QuartersOutlined,
    PlayCircleOutlined,
    PlusSquareOutlined,
} from '@ant-design/icons'
import { Button, Empty, Flex, Form, FormProps, Input, List, message } from 'antd'
import clsx from 'clsx'
import { useAppDispatch, useAppSelector } from 'helpers/redux'
import { YoutubeAppState } from 'models/youtube'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { RootState } from 'stores'
import { activeSrc, addNewSrc, removeSrc } from 'stores/sliceReducers/youtube'
import { setLocalStorage } from 'utils/localStorage'
import { convertToEmbedUrl } from 'utils/validateUrl'

type FieldType = {
    titleVideo: string
    urlVideo: string
}

export const YoutubeApp = () => {
    const dispatch = useAppDispatch()
    const { activatedVideo, youtubeList } = useAppSelector((store: RootState) => store.youtube)
    const { t } = useTranslation(['youtube'])

    const [youtubeForm] = Form.useForm()
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const resetForm = () => youtubeForm.setFieldsValue({ titleVideo: '', urlVideo: '' })

    const handleAddNewVideo: FormProps<FieldType>['onFinish'] = (value: FieldType) => {
        setIsLoading(true)
        const { titleVideo, urlVideo } = value
        const embedUrl = convertToEmbedUrl(urlVideo)

        setTimeout(() => {
            if (!embedUrl) {
                message.error(t('notisVideoNotFound'))
            } else if (youtubeList.some((src) => src.url === embedUrl)) {
                message.warning(t('notisVideoExists'))
            } else {
                dispatch(addNewSrc({ title: titleVideo, url: embedUrl }))
                message.success(t('notisAddNewVideo'))
            }
            resetForm()
            setIsLoading(false)
        }, 1000)
    }

    useEffect(() => {
        setLocalStorage<YoutubeAppState>('youtube', {
            activatedVideo,
            youtubeList,
        })
    }, [youtubeList, activatedVideo])

    return (
        <section className="w-full h-full p-2">
            {youtubeList.length <= 0 && (
                <Flex
                    justify="center"
                    align="center"
                    vertical
                    className="w-full h-52 !mb-5 rounded-lg border-none bg-[rgba(42,51,53,0.5)] text-white text-sm"
                    gap={15}
                >
                    <span>{t('displayYoutube')}</span>
                    <span>{t('displayToolTipTitle')}</span>
                    <span>{t('displayToolTipLink')}</span>
                    <Flex gap={15}>
                        <ArrowDownOutlined />
                        <ArrowDownOutlined />
                        <ArrowDownOutlined />
                    </Flex>
                </Flex>
            )}

            {youtubeList.length > 0 && (
                <iframe
                    src={activatedVideo}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                    className="w-full h-52 border-none rounded-lg mb-5"
                />
            )}
            <Form
                form={youtubeForm}
                name="youtubeApp"
                layout="horizontal"
                autoComplete="off"
                preserve={false}
                className="w-full"
                onFinish={handleAddNewVideo}
            >
                <Flex justify="space-between" align="flex-start" gap={5}>
                    <Form.Item
                        label={null}
                        name="titleVideo"
                        className="flex-1"
                        validateFirst={true}
                        rules={[
                            {
                                pattern: /^(?!\s*$).+/,
                                message: t('inputOnlySpaceTitle'),
                            },
                            {
                                required: true,
                                message: t('inputRequiredTitle'),
                            },
                            { min: 5, message: t('inputMinTitle') },
                            { max: 35, message: t('inputMaxTitle') },
                        ]}
                    >
                        <Input placeholder={t('placeholderTitleVideo')} />
                    </Form.Item>
                    <Form.Item
                        label={null}
                        name="urlVideo"
                        className="flex-1"
                        validateFirst={true}
                        rules={[
                            {
                                pattern: /^(?!\s*$).+/,
                                message: t('inputOnlySpaceUrl'),
                            },
                            {
                                required: true,
                                message: t('inputRequiredUrl'),
                            },
                            { min: 30, message: t('inputMinUrl') },
                            { max: 90, message: t('inputMaxUrl') },
                        ]}
                    >
                        <Input placeholder={t('placeholderUrlvideo')} />
                    </Form.Item>
                    <Form.Item label={null}>
                        <Button
                            type="text"
                            variant="solid"
                            color="blue"
                            htmlType="submit"
                            size="middle"
                            loading={false}
                            className="!px-2 !border-none !shadow-none"
                        >
                            {isLoading ? <Loading3QuartersOutlined spin /> : <PlusSquareOutlined />}
                        </Button>
                    </Form.Item>
                </Flex>
            </Form>
            <List
                itemLayout="vertical"
                dataSource={youtubeList}
                locale={{
                    emptyText: (
                        <Empty
                            description={
                                <span className="text-white">{t('inputEmptyVideoList')}</span>
                            }
                        />
                    ),
                }}
                className="h-64 mt-5 overflow-y-auto"
                style={{ scrollbarWidth: 'none' }}
                renderItem={(video, index) => (
                    <List.Item key={video.id} className="!m-0 !py-2">
                        <Flex justify="space-between" align="center" gap={10}>
                            <Flex
                                className={clsx(
                                    'flex-1 uppercase font-medium',
                                    video.isActivated ? 'text-white' : '',
                                )}
                                justify="flex-start"
                                align="center"
                                gap={5}
                            >
                                <div>{index + 1}.</div>
                                <div>{video.title}</div>
                            </Flex>
                            <Flex justify="flex-end" align="center" gap={5}>
                                <Button
                                    size="small"
                                    type="text"
                                    variant="text"
                                    color="magenta"
                                    className="!px-1 !py-2"
                                    onClick={() => dispatch(activeSrc(video.id))}
                                >
                                    <PlayCircleOutlined style={{ fontSize: '16px' }} />
                                </Button>

                                <Button
                                    size="small"
                                    type="text"
                                    variant="text"
                                    color="volcano"
                                    className="!px-1 !py-2"
                                    onClick={() => dispatch(removeSrc(video.id))}
                                >
                                    <DeleteOutlined
                                        style={{
                                            fontSize: '16px',
                                        }}
                                    />
                                </Button>
                            </Flex>
                        </Flex>
                    </List.Item>
                )}
            />
        </section>
    )
}
