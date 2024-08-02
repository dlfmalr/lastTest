'use client'

import { useEffect, useState } from "react";
import { getArticleList } from "@/app/API/UserAPI";

export default function Page() {
    const [isLoading, setIsLoading] = useState(false);
    const [articleList, setArticleList] = useState([] as any[]);
    const [temp, setTemp] = useState(0);

    const getWeather = () => {
        const key =
            "paJ%2BM8y80vWX8Gu5RWTDurJ0y5rQCX4tjEwLh0F%2FwfUABNbw%2BV2iJD%2FBahqq08K%2BvzgPyAU0GFZ84LmVfEDPgA%3D%3D";

        const dd = new Date();
        const y = dd.getFullYear();
        const m = ("0" + (dd.getMonth() + 1)).slice(-2);
        const d = ("0" + dd.getDate()).slice(-2);
        const ds = y + m + d;

        const dd2 = new Date();
        const h = ("0" + dd2.getHours()).slice(-2);
        const ts = `${h}00`;

        var url =
            "https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtNcst?serviceKey= " +
            key +
            "&pageNo=1&numOfRows=1000&dataType=JSON" +
            "&base_date=" +
            ds +
            "&base_time=" +
            ts +
            "&nx=67&ny=100";

        fetch(url)
            .then((res) => res.json())
            .then((data) => {
                console.log(data.response.body.items.item);
                const itemArr = data.response.body.items.item;
                itemArr.forEach((item: any) => {
                    if (item.category === "T1H") {
                        setTemp(item.obsrValue);
                    }
                });
            })
            .catch((err) => console.log(err));
    };

    useEffect(() => {
        if (!isLoading) {
            getArticleList()
                .then(r => {
                    setArticleList(r);
                    setIsLoading(true);
                }).catch(e => console.log(e));
        }
    }, [isLoading]);

    return (
        <div className="min-h-screen w-full bg-white flex flex-col items-center">
            <div className="w-full max-w-5xl p-4">
                <div className="text-center mb-4">
                    <span className="text-xl">현재 기온: {temp}°C</span>
                </div>
                <a href="/article/create" className="bg-blue-500 text-white px-4 py-2 rounded mb-4 inline-block">게시글 생성</a>
                <div className="w-full overflow-x-auto">
                    <div className="flex justify-between p-2 bg-gray-200 rounded">
                        <div className="w-1/6 text-center">번호</div>
                        <div className="w-5/6 text-center">제목</div>
                    </div>
                    {articleList.map((article, index) => (
                        <a href={`/article/${article.id}`} key={article.id} className="block p-2 border-b">
                            <div className="flex justify-between">
                                <div className="w-1/6 text-center">{index + 1}</div>
                                <div className="w-5/6 text-center">{article.title}</div>
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
}