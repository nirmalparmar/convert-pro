<template>
    <footer class="footer">
        <div class="logo">
            <svg height="30" viewBox="0 0 100 120.00119935280725" class="css-1j8o68f" xmlns="http://www.w3.org/2000/svg">
                <defs id="SvgjsDefs1599"></defs>
                <g id="SvgjsG1600" featurekey="symbolFeature-0"
                    transform="matrix(1.5000149919100907,0,0,1.5000149919100907,-25.000749595504534,-15.000149919100906)"
                    fill="#000000">
                    <path xmlns="http://www.w3.org/2000/svg" fill="#000"
                        d="M16.667,43.33C16.667,69.104,37.559,90,63.333,90v-6.667c-22.093,0-40-17.91-40-40.003H16.667z"></path>
                    <path xmlns="http://www.w3.org/2000/svg" fill="#000"
                        d="M63.333,16.667c-14.729,0-26.666,11.94-26.666,26.664C36.667,58.06,48.604,70,63.333,70v6.667  C44.922,76.667,30,61.741,30,43.33C30,24.922,44.922,10,63.333,10V16.667z">
                    </path>
                    <path xmlns="http://www.w3.org/2000/svg" fill="#3f51b5"
                        d="M63.333,43.333v20c-11.048,0-20-8.955-20-20.003c0-11.045,8.952-19.997,20-19.997c11.049,0,20,8.952,20,19.997  L63.333,43.333z">
                    </path>
                </g>
            </svg>
            <h3>Convert Pro</h3>
        </div>
        <div class="links"> 
            <a href="/jsonformatter" target="_blank" title="Json Formatter">Json Formatter</a>
            <a href="/csv-to-json" target="_blank" title="CSV to Json Converter">Csv Converter</a>
            <!-- <a href="/json-to-csv" target="_blank" title="JSON to CSV Converter">Json Converter</a> -->
            <a href="/json-diff" target="_blank" title="JSON Difference Checker">Json Diff</a>
        </div>
        <div class="copyright"> Copyright © Convert Pro 2023 <a href="/sitemap.xml" target="_blank" title="Sitemap">Sitemap</a></div>
    </footer>
</template>

<script>
export default {
    
}
</script>

<style lang="less" scoped>
    .footer{
        min-height: 200px;
        margin-top: 90px;
        width: 100%;
        background: #fff;
        display: flex;
        flex-direction: column;
        padding: 2rem;
        padding-bottom: 10px;
        // justify-content: space-between;
        color: #222;
        font-size: 14px;

        .logo{
            display: flex;
            align-items: center;
            justify-content: center;
            height: 70px;
            gap: 25px;
        }
        .links{
            display: flex;
            align-items: center;
            justify-content: center;
            margin-top: auto;
            margin-bottom: 10px;
            a {
                text-decoration: none;
                color: #222;
                padding: 0 30px;
                &:hover{
                    // text-decoration: underline;
                    color: #383838;
                }
            }
        }

        .copyright{
            text-align: center;
            font-size: 12px;

            a {
                color: #222;
                text-decoration: none;
                padding-left: 10px;
                &:hover{
                    text-decoration: underline;
                }
            }
        }
    }
</style>